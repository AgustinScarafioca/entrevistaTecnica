type Props = { message: string; onClose?: () => void };

export function ErrorBanner({ message, onClose }: Props) {
    return (
        <div style={{ padding: 12, border: "1px solid #f5c2c7", background: "#f8d7da", borderRadius: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
            <strong style={{ color: "#842029" }}>Error</strong>
            {onClose ? (
            <button onClick={onClose} style={{ cursor: "pointer" }}>
                x
            </button>
            ) : null}
        </div>
        <div style={{ color: "#842029", marginTop: 6 }}>{message}</div>
        </div>
    );
}