import React from "react";
import styles from "./toast.module.css";

function toasted() {
  return (
    <div>
      <div className={styles["polite"]} aria-live="polite" aria-atomic="true">
        <div className={`toast ${styles["cont-toast"]}`}>
          <div className="toast-header">
            {/* <img src="..." className=''="rounded mr-2" alt="..."> */}
            <strong className="mr-auto">Log In success</strong>
            <small class="text-muted">just now</small>
            <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="toast-body">Please wait , you will redirected</div>
        </div>
      </div>
    </div>
  );
}

export default toasted;
