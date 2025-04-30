'use client';
import NegotiationsChart from '@/components/piechart/page'; // Agrega esta línea
import styles from "./page.module.css";
import Sidebar from "@/components/sidebar/page";
import { useEffect, useState } from "react";
import { FaClipboardList, FaBoxOpen, FaTasks, FaBuilding } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area } from 'recharts';

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
    fetch("http://localhost:8080/api/dashboard")
      .then(res => res.json())
      .then(data => setDashboardData(data));

    /*
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
            { idProducto: 20, cantidadSumada: 9, nombre: "Salchichas" },
          ],
          negotiationsByWeek: [
            { weekStart: "2025-03-24T00:00:00.000Z", negotiationCount: 2 },
            { weekStart: "2025-03-31T00:00:00.000Z", negotiationCount: 4 },
            { weekStart: "2025-04-07T00:00:00.000Z", negotiationCount: 5 },
            { weekStart: "2025-04-14T00:00:00.000Z", negotiationCount: 3 },
            { weekStart: "2025-04-21T00:00:00.000Z", negotiationCount: 6 },
          ],
        };
        setDashboardData(mockData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();*/
  }, []);

  if (!dashboardData) {
    return <div>Cargando...</div>; // Loading indicator
  }


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('es-MX', options);
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.main}>
        <h1 className="text-6xl font-dangrek ml-10 mt-10">DASHBOARD</h1>

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
          <div className={`${styles.chart} ml-10`}>
            <h3 className='font-bold mb-6'>Negociaciones por Semana</h3>
            <LineChart
              width={700}
              height={300}
              data={dashboardData.negotiationsByWeek}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="weekStart" tickFormatter={formatDate} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="negotiationCount"
                fill="#8884d8"
                stroke="#8884d8"
                fillOpacity={0.3}
              />
              <Line
                type="monotone"
                dataKey="negotiationCount"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </div>
          <div className={`${styles.analytics} mr-10`}>
            <NegotiationsChart
              closed={dashboardData.closedNegotiations}
              middle={dashboardData.middleNegotiations}
              starting={dashboardData.startingNegotiations}
            />
          </div>
          {/* Nuevo contenedor para los productos */}
          <div className={`${styles.productInfoContainer} ml-10 mt-6 flex w-full`}>
            {/* Contenedor para los 3 productos con menor stock */}
            <div className={`${styles.lowestStockContainer} w-1/2 pr-2`}>
              <h3 className="font-bold mb-4">Los 3 productos con menor stock:</h3>
              {dashboardData.lowestStock.slice(0, 3).map(product => (
                <div key={product.id} className={styles.productCard}>
                  <h4 className="font-semibold">{product.nombre}</h4>
                  <p>Stock: {product.stock}</p>
                  <p>Precio: ${product.precio}</p>
                </div>
              ))}
            </div>

            {/* Contenedor para los 3 mejores productos */}
            <div className={`${styles.bestProductsContainer} w-1/2 pl-2`}>
              <h3 className="font-bold mb-4">Los 3 mejores productos:</h3>
              {dashboardData.bestProducts.slice(0, 3).map(product => (
                <div key={product.idProducto} className={styles.productCard}>
                  <h4 className="font-semibold">{product.nombre}</h4>
                  <p>Cantidad Vendida: {product.cantidadSumada}</p>
                </div>
              ))}
            </div>

          </div>

        </section>
      </main>
    </div>
  );
};

export default Dashboard;