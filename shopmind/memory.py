import os
import json
import uuid
import logging
from typing import List, Dict, Any, Optional

import voyageai
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct

logger = logging.getLogger(__name__)

class ShopMindMemory:
    def __init__(self):
        self.voyage_api_key = os.getenv("VOYAGE_API_KEY")
        self.qdrant_url = os.getenv("QDRANT_URL", "http://localhost:6333")
        self.qdrant_api_key = os.getenv("QDRANT_API_KEY")
        
        self.history_collection = "shopmind_history"
        self.prefs_collection = "shopmind_prefs"
        self.embedding_model = "voyage-large-2-instruct"
        self.vector_size = 1024  # Size for voyage-large-2-instruct

        self.voyage_client = None
        self.qdrant_client = None
        
        self._initialize_clients()
        
    def _initialize_clients(self):
        try:
            if self.voyage_api_key:
                self.voyage_client = voyageai.Client(api_key=self.voyage_api_key)
            else:
                logger.warning("VOYAGE_API_KEY not set. Memory disabled.")
                
            if self.qdrant_url:
                self.qdrant_client = QdrantClient(url=self.qdrant_url, api_key=self.qdrant_api_key)
                self._ensure_collections()
        except Exception as e:
            logger.error(f"Failed to initialize memory clients: {e}")
            self.voyage_client = None
            self.qdrant_client = None

    def _ensure_collections(self):
        if not self.qdrant_client:
            return
            
        try:
            collections = [c.name for c in self.qdrant_client.get_collections().collections]
            
            for collection_name in [self.history_collection, self.prefs_collection]:
                if collection_name not in collections:
                    self.qdrant_client.create_collection(
                        collection_name=collection_name,
                        vectors_config=VectorParams(size=self.vector_size, distance=Distance.COSINE),
                    )
                    logger.info(f"Created collection {collection_name}")
        except Exception as e:
            logger.error(f"Failed to ensure collections: {e}")
            self.qdrant_client = None # Disable Qdrant if we can't ensure collections

    def _get_embedding(self, text: str) -> Optional[List[float]]:
        if not self.voyage_client or not text.strip():
            return None
        try:
            result = self.voyage_client.embed([text], model=self.embedding_model)
            if result.embeddings and len(result.embeddings) > 0:
                return result.embeddings[0]
        except Exception as e:
            logger.error(f"Embedding generation failed: {e}")
        return None

    def store_history(self, user_id: str, query: str, context: str):
        if not self.qdrant_client:
            return
            
        try:
            text_to_embed = f"Query: {query}\n\nContext: {context}"
            vector = self._get_embedding(text_to_embed)
            if not vector:
                return
                
            payload = {
                "user_id": user_id,
                "query": query,
                "context": context
            }
            
            self.qdrant_client.upsert(
                collection_name=self.history_collection,
                points=[
                    PointStruct(
                        id=str(uuid.uuid4()),
                        vector=vector,
                        payload=payload
                    )
                ]
            )
        except Exception as e:
            logger.warning(f"Failed to store history: {e}")

    def store_preferences(self, user_id: str, preferences: Dict[str, Any]):
        if not self.qdrant_client:
            return
            
        try:
            pref_text = json.dumps(preferences)
            text_to_embed = f"User: {user_id}\nPreferences: {pref_text}"
            vector = self._get_embedding(text_to_embed)
            if not vector:
                return
                
            payload = {
                "user_id": user_id,
                "preferences": preferences
            }
            
            self.qdrant_client.upsert(
                collection_name=self.prefs_collection,
                points=[
                    PointStruct(
                        # Deterministic ID for user prefs so we just overwrite the old one
                        id=str(uuid.uuid5(uuid.NAMESPACE_DNS, user_id)), 
                        vector=vector,
                        payload=payload
                    )
                ]
            )
        except Exception as e:
            logger.warning(f"Failed to store preferences: {e}")

    def query_history(self, query: str, user_id: str, limit: int = 3) -> str:
        if not self.qdrant_client:
            return ""
            
        try:
            vector = self._get_embedding(query)
            if not vector:
                return ""
                
            results = self.qdrant_client.search(
                collection_name=self.history_collection,
                query_vector=vector,
                limit=limit,
                # Simple filter by user_id
                query_filter={
                    "must": [
                        {"key": "user_id", "match": {"value": user_id}}
                    ]
                }
            )
            
            formatted_history = []
            for hit in results:
                if hit.score > 0.7:  # basic threshold
                    payload = hit.payload
                    formatted_history.append(f"Past Query: {payload.get('query')}\nPast Insight: {payload.get('context')}")
                    
            return "\n\n".join(formatted_history)
        except Exception as e:
            logger.warning(f"Failed to query history: {e}")
            return ""

    def get_preferences(self, user_id: str) -> Dict[str, Any]:
        if not self.qdrant_client:
            return {}
            
        try:
            # We used a UUID5 seeded by user_id for the preference point ID
            point_id = str(uuid.uuid5(uuid.NAMESPACE_DNS, user_id))
            results = self.qdrant_client.retrieve(
                collection_name=self.prefs_collection,
                ids=[point_id]
            )
            
            if results and len(results) > 0:
                return results[0].payload.get("preferences", {})
        except Exception as e:
            logger.warning(f"Failed to retrieve preferences: {e}")
            
        return {}

memory_store = ShopMindMemory()
