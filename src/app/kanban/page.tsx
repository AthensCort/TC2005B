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
  const [contacts, setContacts] = useState([
    {
        user: "Luis Torres",
        client: "GlobalWare",
        state: "Finish Stage",
        affair: "Final Negotiations",
        description: "Discussing terms before closing",
        date: "2025-04-12",
        commission: "$2,000",
      },
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
      prev.map((contact, i) => {
        const cardKey = `${contact.client}-${i}`;
        return cardKey === draggedId ? { ...contact, state: newStage } : contact;
      })
    );
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        <div className={styles.header}>
          <h2>LEAD FLOW</h2>
          <div className={styles.filters}>
            <button>Private</button>
            <button>Personal</button>
            <button>Color group</button>
            <button>Clients</button>
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
                          const cardKey = `${contact.client}-${i}`;
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
    </div>
  );
}
