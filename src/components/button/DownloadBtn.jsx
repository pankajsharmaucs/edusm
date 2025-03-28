import React from 'react'
import { SlCloudDownload } from 'react-icons/sl'

const DownloadBtn = ({App_Link}) => {
    return (
        <div className='m-2 '>
            <a href={`/files/app/${App_Link}`} download className='mt-5 border btn btn-primary btn-md'>
                Download APP
            </a>
        </div>
    )
}

export default DownloadBtn