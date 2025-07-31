import React, { useState, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import toast from 'react-hot-toast';
import { Alert02Icon } from '@hugeicons/core-free-icons';

function DeleteConfirmationModal({ show, onClose, onConfirm }) {
  const [confirmationText, setConfirmationText] = useState('');

  // Reset the input field every time the modal is opened
  useEffect(() => {
    if (show) {
      setConfirmationText('');
    }
  }, [show]);

  if (!show) {
    return null;
  }

  // Disable the confirm button until the user types "DELETE"
  const isConfirmDisabled = confirmationText !== 'DELETE';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content delete-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="delete-modal-header">
          <HugeiconsIcon
            icon={Alert02Icon}
            size={48}
            color="var(--color-red)"
            strokeWidth={2}
          />
        </div>
        <div className="delete-modal-body">
          <h2>Are you sure you want to delete this book?</h2>
          <p>
            This will permanently delete the book. This action cannot be undone.
          </p>
          <label htmlFor="delete-confirm">
            Please type <strong>DELETE</strong> to confirm.
          </label>
          <input
            id="delete-confirm"
            type="text"
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
            placeholder="DELETE"
            autoComplete="off"
          />
        </div>
        <div className="delete-modal-footer">
          <button
            type="button"
            className="modal-btn cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="modal-btn confirm-delete-btn"
            onClick={onConfirm}
            disabled={isConfirmDisabled}
          >
            Delete Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
