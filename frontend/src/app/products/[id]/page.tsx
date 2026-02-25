"use client";

import { useSearchParams } from "next/navigation";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Sparkles, ShoppingBag, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

// Mock data for the price chart
const priceData = [
    { month: 'Jan', price: 349 },
    { month: 'Feb', price: 349 },
    { month: 'Mar', price: 329 },
    { month: 'Apr', price: 299 },
    { month: 'May', price: 319 },
    { month: 'Jun', price: 289 },
    { month: 'Jul', price: 279 },
    { month: 'Aug', price: 269 },
    { month: 'Sep', price: 259 },
    { month: 'Oct', price: 259 },
    { month: 'Nov', price: 219 },
    { month: 'Dec', price: 249 }
];

export default function ProductDetails({ params }: { params: { id: string } }) {
    const searchParams = useSearchParams();
    const source = searchParams.get("source") || "Multiple Vendors";
    const title = decodeURIComponent(params.id);

    return (
        <div className="container" style={{ padding: "3rem 2rem", display: "flex", gap: "4rem" }}>

            {/* Left side: Images */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>

                {/* Main Image Placeholder */}
                <div style={{
                    aspectRatio: "1/1",
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "var(--shadow-sm)"
                }}>
                    {/* We will use a mockup image, or a placeholder if none */}
                    <div style={{ color: "var(--muted)", fontWeight: 500, fontSize: "1.2rem" }}>
                        Product Image
                    </div>
                </div>

                {/* Thumbnails */}
                <div style={{ display: "flex", gap: "1rem" }}>
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} style={{
                            aspectRatio: "1/1",
                            width: "80px",
                            backgroundColor: "var(--surface)",
                            border: i === 1 ? "2px solid var(--primary)" : "1px solid var(--border)",
                            borderRadius: "8px",
                            cursor: "pointer"
                        }} />
                    ))}
                </div>

            </div>

            {/* Right side: Product Data */}
            <div style={{ flex: 1.2, display: "flex", flexDirection: "column", gap: "2rem" }}>

                {/* Title & Price */}
                <div>
                    <h1 style={{ fontSize: "2rem", fontWeight: 800, lineHeight: 1.2, marginBottom: "0.5rem" }}>
                        {title}
                    </h1>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--primary)" }}>$249.00</span>
                        <span style={{ color: "#16a34a", fontSize: "0.9rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem", backgroundColor: "#dcfce7", padding: "0.25rem 0.75rem", borderRadius: "9999px" }}>
                            Lowest price in 6 months
                        </span>
                    </div>
                </div>

                {/* Price History Chart */}
                <div className="card" style={{ padding: "1.5rem 1.5rem 0.5rem 1rem", border: "1px solid var(--border)", borderRadius: "12px", boxShadow: "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", paddingLeft: "1rem" }}>
                        <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>Price History</h3>
                        <button className="btn-outline" style={{ padding: "0.25rem 0.75rem", fontSize: "0.8rem", height: "auto" }}>
                            + Price Alert
                        </button>
                    </div>
                    <div style={{ height: "200px", width: "100%" }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={priceData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "var(--muted)" }}
                                    dy={10}
                                />
                                <YAxis
                                    domain={['dataMin - 20', 'dataMax + 20']}
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: "var(--muted)" }}
                                    tickFormatter={(val) => \`$\${val}\`}
                                dx={-10}
                />
                                <Tooltip
                                    cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
                                    contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "var(--shadow-md)" }}
                                    formatter={(value) => [\`$\${value}\`, 'Price']}
                />
                                <Line
                                    type="monotone"
                                    dataKey="price"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    dot={false}
                                    activeDot={{ r: 6, fill: "#10b981", strokeWidth: 0 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* AI Analysis Block */}
                <div style={{
                    backgroundColor: "#eff6ff",
                    border: "1px solid #bfdbfe",
                    padding: "1.5rem",
                    borderRadius: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem"
                }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e3a8a", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Sparkles size={18} />
                        AI Price Analysis
                    </h3>
                    <p style={{ fontSize: "0.95rem", color: "#1e40af", lineHeight: 1.5 }}>
                        Market signals indicate demand is dropping ahead of a potential new release cycle next month.
                        <strong> We project prices could drop another 5-10% down to $220.</strong> If you don't need it urgently, consider waiting.
                    </p>
                </div>

                {/* Buy Flow Retailers */}
                <div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>Buy flow retailers</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>

                        {/* Amazon Row */}
                        <div className="card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem", boxShadow: "none" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                <div style={{ width: "40px", height: "40px", backgroundColor: "white", border: "1px solid var(--border)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "20px" }}>a</div>
                                <div>
                                    <div style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        Amazon <CheckCircle2 size={14} color="#16a34a" />
                                    </div>
                                    <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>In Stock • Prime Delivery</div>
                                </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                                <div style={{ fontWeight: 700, fontSize: "1.2rem" }}>$249.00</div>
                                <button className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1.25rem", borderRadius: "8px" }}>
                                    Buy Now <ArrowUpRight size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Best Buy Row */}
                        <div className="card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem", boxShadow: "none" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                <div style={{ width: "40px", height: "40px", backgroundColor: "#0046be", color: "white", borderRadius: "8px", display: "flex", alignItems: "center", justifyItems: "center", paddingLeft: "10px", fontWeight: 800, fontSize: "14px", lineHeight: "1" }}>BEST<br />BUY</div>
                                <div>
                                    <div style={{ fontWeight: 600 }}>Best Buy</div>
                                    <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>In Stock • Pickup Available</div>
                                </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                                <div style={{ fontWeight: 700, fontSize: "1.2rem" }}>$249.99</div>
                                <button className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1.25rem", borderRadius: "8px", backgroundColor: "var(--surface)", color: "var(--foreground)", border: "1px solid var(--border)" }}>
                                    Buy Now <ArrowUpRight size={16} />
                                </button>
                            </div>
                        </div>

                        {/* eBay Row */}
                        <div className="card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem", boxShadow: "none" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                <div style={{ width: "40px", height: "40px", backgroundColor: "white", border: "1px solid var(--border)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "16px", color: "#e53238" }}>ebay</div>
                                <div>
                                    <div style={{ fontWeight: 600 }}>eBay</div>
                                    <div style={{ fontSize: "0.85rem", color: "var(--muted)" }}>Refurbished options only</div>
                                </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                                <div style={{ fontWeight: 700, fontSize: "1.2rem" }}>$219.00</div>
                                <button className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1.25rem", borderRadius: "8px", backgroundColor: "var(--surface)", color: "var(--foreground)", border: "1px solid var(--border)" }}>
                                    Buy Now <ArrowUpRight size={16} />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
}
