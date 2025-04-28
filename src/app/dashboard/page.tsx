'use client';
import NegotiationsChart from '@/components/piechart/page'; // Agrega esta línea
import styles from "./page.module.css";
import Sidebar from "@/components/sidebar/page";
import { useEffect, useState } from "react";
import { FaClipboardList, FaBoxOpen, FaTasks, FaBuilding } from "react-icons/fa";

interface DashboardData {
  clientCount: number;
  productCount: number;
  enterpriseCount: number;
  negotiationCount: number;
  closedNegotiations: number;
  startingNegotiations: number;
  middleNegotiations: number;
  finishNegotiations: number;
  lowestStock: { id: number; nombre: string; precio: number; stock: number }[];
  bestProducts: { idProducto: number; cantidadSumada: number; nombre: string }[];
  negotiationsByWeek: { weekStart: string; negotiationCount: number }[];
}

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mockData: DashboardData = {
          clientCount: 9,
          productCount: 7,
          enterpriseCount: 11,
          negotiationCount: 1,
          closedNegotiations: 3,
          startingNegotiations: 6,
          middleNegotiations: 4,
          finishNegotiations: 0,
          lowestStock: [
            { id: 7, nombre: "Pug12", precio: 7, stock: -2 },
            { id: 3, nombre: "Pug", precio: 5, stock: 0 },
            { id: 2, nombre: "Xbox series X", precio: 10000, stock: 2 },
          ],
          bestProducts: [
            { idProducto: 1, cantidadSumada: 5, nombre: "chihuahua" },
            { idProducto: 4, cantidadSumada: 2, nombre: "Rottweiler" },
          ],
          negotiationsByWeek: [
            { weekStart: "1969-12-29T00:00:00.000Z", negotiationCount: 1 },
          ],
        };
        setDashboardData(mockData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  if (!dashboardData) {
    return <div>Cargando...</div>; // Loading indicator
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <h1 className="text-6xl font-dangrek ml-10 mt-10">KANBAN</h1>

        {/* --- Stats Section --- */}
        <section className={`${styles.statsGrid} mt-10`}>
          {/* CLIENTES */}
          <div className={styles.statCard}>
            <div className={`${styles.iconWrapper} ${styles.clientsIcon}`}>
              <FaClipboardList className={styles.icon} />
            </div>
            <div className={styles.textWrapper}>
              <span className={styles.statNumber}>{dashboardData.clientCount}</span>
              <span className={`${styles.statLabel} text-purple-300`}>Clientes</span>
            </div>
          </div>

          {/* EMPRESAS */}
          <div className={styles.statCard}>
            <div className={`${styles.iconWrapper} ${styles.enterprisesIcon}`}>
              <FaBuilding className={styles.icon} />
            </div>
            <div className={styles.textWrapper}>
              <span className={styles.statNumber}>{dashboardData.enterpriseCount}</span>
              <span className={`${styles.statLabel} text-purple-300`}>Empresas</span>
            </div>
          </div>

          {/* NEGOCIACIONES */}
          <div className={styles.statCard}>
            <div className={`${styles.iconWrapper} ${styles.negotiationsIcon}`}>
              <FaTasks className={styles.icon} />
            </div>
            <div className={styles.textWrapper}>
              <span className={styles.statNumber}>{dashboardData.negotiationCount}</span>
              <span className={`${styles.statLabel} text-purple-300`}>Negociaciones</span>
            </div>
          </div>

          {/* PRODUCTOS */}
          <div className={styles.statCard}>
            <div className={`${styles.iconWrapper} ${styles.productsIcon}`}>
              <FaBoxOpen className={styles.icon} />
            </div>
            <div className={styles.textWrapper}>
              <span className={styles.statNumber}>{dashboardData.productCount}</span>
              <span className={`${styles.statLabel} text-purple-300`}>Productos</span>
            </div>
          </div>
        </section>

        {/* --- Other Content Section --- */}
        <section className={styles.contentGrid}>
          <div className={styles.chart}>Monthly Status Chart</div>
          <div className={`${styles.analytics} mr-10`}>
            <NegotiationsChart
              closed={dashboardData.closedNegotiations}
              middle={dashboardData.middleNegotiations}
              starting={dashboardData.startingNegotiations}
            />
          </div>
          <div className={styles.transactions}>Transaction Status Table</div>
          <div className={styles.contacts}>Recent Contacts</div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;