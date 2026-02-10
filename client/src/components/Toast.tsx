import useToastStore from '../store/useToastStore';

function Toast() {
    const toasts = useToastStore(state => state.toasts);

    return (
        <div className="toast toast-top">
            {
                toasts.map((toast) => {
                    const { id, message, type } = toast;
                    return (
                        type == 'success' ? (
                            <div role={type} className={`alert alert-success`} key={id}>
                                <span>{message}</span>
                            </div>
                        ) : type == 'error' ? (
                            <div role={type} className={`alert alert-error`} key={id}>
                                <span>{message}</span>
                            </div>
                        ) : type == 'warning' ? (
                            <div role={type} className={`alert alert-warning`} key={id}>
                                <span>{message}</span>
                            </div>
                        ) : type == 'info' ? (
                            <div role={type} className={`alert alert-info`} key={id}>
                                <span>{message}</span>
                            </div>
                        ) : (
                            <div role={type} className={`alert`} key={id}>
                                <span>{message}</span>
                            </div>
                        )
                    )
                })
            }
        </div>
    )
}
export default Toast;