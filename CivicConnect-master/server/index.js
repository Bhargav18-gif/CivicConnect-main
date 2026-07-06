import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5177;

app.use(cors());
app.use(express.json());

const DEPARTMENTS = [
  { name: "Roads", total: 120, resolved: 80 },
  { name: "Water", total: 90, resolved: 52 },
  { name: "Electricity", total: 70, resolved: 40 },
  { name: "Garbage", total: 60, resolved: 35 },
  { name: "Drainage", total: 45, resolved: 22 },
  { name: "Health", total: 30, resolved: 25 },
];

// Return department stats
app.get("/api/departments/stats", (req, res) => {
  res.json(DEPARTMENTS);
});

// Alternate endpoint
app.get("/api/issues/department-stats", (req, res) => {
  res.json({ stats: DEPARTMENTS });
});

// Generic issues stats
app.get("/api/issues/stats", (req, res) => {
  const total = DEPARTMENTS.reduce((s, d) => s + d.total, 0);
  const resolved = DEPARTMENTS.reduce((s, d) => s + d.resolved, 0);
  res.json({ total, resolved, byDepartment: DEPARTMENTS });
});

// Issue lookup for TrackComplaintPage
app.get("/api/issues/:id", (req, res) => {
  const { id } = req.params;
  const sample = {
    referenceId: id.toUpperCase(),
    title: "Sample issue",
    category: "Roads",
    createdAt: new Date().toISOString(),
    description: "This is a mocked issue returned by the local dev API.",
    status: "in-progress",
  };
  res.json({ issue: sample });
});

app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
});
