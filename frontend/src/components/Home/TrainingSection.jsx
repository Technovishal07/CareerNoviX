import React from "react";
// Lucide icons load karne ke liye 'npm install lucide-react' karein
import {
  Code2,
  Smartphone,
  Coffee,
  Database,
  BarChart3,
  Layers,
  Palette,
  ShieldAlert,
  ArrowUpRight,
} from "lucide-react";

const TrainingSection = () => {
  const programs = [
    { id: 1, name: "Full Stack Development", icon: Code2 },
    { id: 2, name: "App Development", icon: Smartphone },
    { id: 3, name: "Java Backend Core", icon: Coffee },
    { id: 4, name: "Python & Data Science", icon: Database },
    { id: 5, name: "Power BI & Analytics", icon: BarChart3 },
    { id: 6, name: "Data Structures & SQL", icon: Layers },
    { id: 7, name: "UI/UX Design Systems", icon: Palette },
    { id: 8, name: "Ethical Hacking", icon: ShieldAlert },
  ];

  return (
    <section className="ts-section-wrapper">
      <div className="ts-header-container">
        <h1 className="ts-main-title">Training Programs</h1>
        <p className="ts-description">
          Accelerate your career with industry-recognized certifications and
          dedicated placement support.
        </p>
      </div>

      <div className="ts-main-card">
        <div className="ts-card-header">
          <h6>For Colleges – Training Sessions</h6>
        </div>

        <div className="ts-programs-grid">
          {programs.map((program) => {
            const IconComponent = program.icon;
            return (
              <div key={program.id} className="ts-program-card">
                <div className="ts-icon-container">
                  <IconComponent className="ts-icon" size={22} />
                </div>
                <span className="ts-program-name">{program.name}</span>
              </div>
            );
          })}
        </div>

        <div className="ts-action-container">
          <button
            className="ts-apply-button"
            onClick={() =>
              window.open(
                "YOUR_GOOGLE_FORM_LINK_HERE",
                "_blank",
                "noopener,noreferrer",
              )
            }
          >
            Apply For Training
            <ArrowUpRight size={18} className="ts-btn-icon" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrainingSection;
