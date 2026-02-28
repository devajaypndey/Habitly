import usePWAUpdate from '@/pwa/usePWAUpdate'
import React from 'react'

function PWAUpdateToast() {
   const { show, updateServiceWorker } = usePWAUpdate();

   if(!show) return null;
   
  return (
    <div style={styles.container}>
        <p>New update available 🚀</p>
        <button
            onClick={() => updateServiceWorker(true)}
            style={styles.button}
        >
            Refresh
        </button>
    </div>
  )
}

const styles = {
  container: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "#5A7ACD",
    color: "white",
    padding: "12px 16px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    zIndex: 9999,
  },
  button: {
    marginTop: "6px",
    background: "white",
    color: "#5A7ACD",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default PWAUpdateToast