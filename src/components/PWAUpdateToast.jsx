import usePWAUpdate from '@/pwa/usePWAUpdate'

function PWAUpdateToast() {
   const { show, updateServiceWorker } = usePWAUpdate();

   if(!show) return null;

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <span style={{ fontSize: '16px' }}>🚀</span>
        <p style={styles.text}>New update available</p>
      </div>
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
    background: "var(--popover)",
    color: "var(--foreground)",
    padding: "12px 16px",
    borderRadius: "6px",
    border: "1px solid var(--border)",
    boxShadow: "0 0 0 1px rgba(15,15,15,0.05), 0 3px 6px rgba(15,15,15,0.1), 0 9px 24px rgba(15,15,15,0.2)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
  },
  content: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  text: {
    margin: 0,
    fontWeight: 500,
  },
  button: {
    background: "var(--notion-blue, #2EAADC)",
    color: "white",
    border: "none",
    padding: "4px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
    transition: "opacity 120ms ease",
  },
};

export default PWAUpdateToast