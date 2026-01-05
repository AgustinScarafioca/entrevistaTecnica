type Props = { message: string; onClose?: () => void };

export function ErrorBanner({ message, onClose }: Props) {
    return (
        <div className="alert alert-danger d-flex align-items-start justify-content-between gap-3" role="alert">
        <div>
            <div className="fw-semibold">Error</div>
            <div className="small">{message}</div>
        </div>

        {onClose ? (
            <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={onClose}
            />
        ) : null}
        </div>
    );
}