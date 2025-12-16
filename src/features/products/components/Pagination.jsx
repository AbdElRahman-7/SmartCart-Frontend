// src/components/Pagination.jsx
const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <footer className="mt-6 flex justify-between items-center">
      <span>
        Page {page} of {totalPages}
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </footer>
  );
};

<<<<<<< HEAD
export default Pagination;
=======
export default Pagination;
>>>>>>> main
