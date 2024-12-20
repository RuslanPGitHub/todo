function confirmDelete(entityId) {
    if (
        confirm(`You really want to delete this todo?`)
    ) {
        fetch(`/delete/${entityId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    window.location.replace(`/`);
                } else {
                    alert('Error deleting record');
                }
            })
            .catch((error) => {
                console.error('Error deleting record:', error);
                alert('Error deleting record');
            });
    }
}
