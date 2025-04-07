'use client'
import Sidebar from "@/components/sidebar/page";
import styles from "./page.module.css";
import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

export default function LeadFlow() {
  const [showModal, setShowModal] = useState(false);
  const [contacts, setContacts] = useState([
    {
      user: "Carlos Mendoza",
      client: "Tech Solutions",
      state: "Starting",
      affair: "Initial Contact",
      description: "Reached out to discuss potential collaboration",
      date: "2025-04-10",
      commission: "$500",
    },
    {
      user: "Laura García",
      client: "InnovaCorp",
      state: "Middle Stage",
      affair: "Product Presentation",
      description: "Showed platform demo and features",
      date: "2025-04-11",
      commission: "$1,200",
    },
    {
      user: "Luis Torres",
      client: "GlobalWare",
      state: "Finish Stage",
      affair: "Final Negotiations",
      description: "Discussing terms before closing",
      date: "2025-04-12",
      commission: "$2,000",
    },
  ]);

  const [form, setForm] = useState({
    user: "",
    client: "",
    state: "",
    affair: "",
    description: "",
    date: "",
    commission: "",
  });

  const [expandedCard, setExpandedCard] = useState<{ [key: string]: boolean }>({});
  const [reportPopup, setReportPopup] = useState<string | null>(null);

  const stages = [
    "Starting",
    "Middle Stage",
    "Finish Stage",
    "Close Won",
    "Close Lost",
  ];

  const handleToggleCard = (key: string) => {
    setExpandedCard((prev) => ({
      ...Object.fromEntries(Object.entries(prev).map(([k]) => [k, false])),
      [key]: !prev[key],
    }));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const draggedId = result.draggableId;
    const newStage = result.destination.droppableId;

    setContacts((prev) =>
      prev.map((contact) => {
        const cardKey = `${contact.client}-${contact.user}-${contact.date}`;
        return cardKey === draggedId ? { ...contact, state: newStage } : contact;
      })
    );
  };

  const generateReport = async () => {
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=SU-APIKEY';

    const payload = {
      contents: [{
        parts: [{
          text: `Summarize this data: ${JSON.stringify(contacts)}`,
        }],
      }],
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const resp = await response.json();
      const summary = resp.candidates[0]?.content?.parts[0]?.text || "No summary available.";
      setReportPopup(summary);
    } catch (error) {
      console.error("Error generating report:", error);
      setReportPopup("Failed to generate report.");
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        <div className={styles.header}>
          <h1 className="text-3xl font-bold pl-3 mt-5">KANBAN</h1>
          <div className={styles.filters}>
            <button>Color Filter</button>
            <button>Save changes</button>
            <button onClick={generateReport}>Generate Report "AI"</button>
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className={styles.pipeline}>
            {stages.map((stage) => (
              <div className={styles.stage} key={stage}>
                <h3>{stage}</h3>
                <Droppable droppableId={stage}>
                  {(provided) => (
                    <div
                      className={styles.cardList}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {contacts
                        .filter((c) => c.state === stage)
                        .map((contact, i) => {
                          const cardKey = `${contact.client}-${contact.user}-${contact.date}`;
                          return (
                            <Draggable draggableId={cardKey} index={i} key={cardKey}>
                              {(provided) => (
                                <div
                                  className={`${styles.card} ${expandedCard[cardKey] ? styles.expanded : ""}`}
                                  onClick={() => handleToggleCard(cardKey)}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div className={styles.cardTitle}>{contact.client}</div>
                                  <div className={styles.cardDetails}>
                                    <span className={styles.date}>{contact.date}</span>
                                    <span className={styles.amount}>{contact.commission}</span>
                                  </div>
                                  <div className={styles.meta}>
                                    <small>{contact.user} - {contact.affair}</small>
                                  </div>
                                  {expandedCard[cardKey] && (
                                    <div className={styles.description}>{contact.description}</div>
                                  )}
                                  <div className={styles.colorTags}>
                                    <span className={styles.tag}></span>
                                    <span className={styles.tag}></span>
                                    <span className={styles.tag}></span>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                      {provided.placeholder}
                      {contacts.filter((c) => c.state === stage).length === 0 && (
                        <div className={styles.emptyPlaceholder}>Drop here</div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>

      {/* Floating Plus Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-purple-700 text-white text-3xl rounded-full shadow-lg flex items-center justify-center hover:bg-purple-800 transition-all z-50"
      >
        +
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#1c1c2c] p-6 rounded-lg w-[400px] space-y-4">
            <h2 className="text-2xl font-bold text-white mb-4">Add New Negotiation</h2>
            <input
              type="text"
              placeholder="User"
              value={form.user}
              onChange={(e) => setForm({ ...form, user: e.target.value })}
              className="w-full p-2 rounded bg-[#2c2c3c] text-white"
            />
            <input
              type="text"
              placeholder="Client"
              value={form.client}
              onChange={(e) => setForm({ ...form, client: e.target.value })}
              className="w-full p-2 rounded bg-[#2c2c3c] text-white"
            />
            <input
              type="text"
              placeholder="State"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              className="w-full p-2 rounded bg-[#2c2c3c] text-white"
            />
            <input
              type="text"
              placeholder="Affair"
              value={form.affair}
              onChange={(e) => setForm({ ...form, affair: e.target.value })}
              className="w-full p-2 rounded bg-[#2c2c3c] text-white"
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full p-2 rounded bg-[#2c2c3c] text-white"
            />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full p-2 rounded bg-[#2c2c3c] text-white"
            />
            <input
              type="text"
              placeholder="Commission"
              value={form.commission}
              onChange={(e) => setForm({ ...form, commission: e.target.value })}
              className="w-full p-2 rounded bg-[#2c2c3c] text-white"
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 rounded text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setContacts([
                    ...contacts,
                    {
                      ...form,
                    },
                  ]);
                  setShowModal(false);
                  setForm({
                    user: "",
                    client: "",
                    state: "",
                    affair: "",
                    description: "",
                    date: "",
                    commission: "",
                  });
                }}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-800 transition rounded text-white"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Popup */}
      {reportPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[600px] h-[500px] space-y-4"> {/* Increased width and added height */}
            <h2 className="text-2xl font-bold mb-4 text-black">AI Report</h2>
            <p className="text-black">{reportPopup}</p> {/* Add the "text-black" class */}
            <div className="flex justify-end">
              <button
                onClick={() => setReportPopup(null)}
                className="px-4 py-2 bg-purple-700 hover:bg-purple-800 transition rounded text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
