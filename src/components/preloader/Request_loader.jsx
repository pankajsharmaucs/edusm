import React from 'react'

const Request_loader = ({ title, loading }) => {
    return (
        <>
            {loading ? (
                <span className="loader border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin"></span>
            ) : (
                title
            )}
        </>
    )
}

export default Request_loader