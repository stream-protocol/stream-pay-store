import React from 'react'
import useIPFS from '../hooks/useIPFS'

interface IPFSDownloadProps {
  hash: string
  filename: string
}

const IPFSDownload = (props: IPFSDownloadProps) => {
  const { hash, filename } = props
  const file = useIPFS(hash, filename)

  return (
    <div>
      {file ? (
        <div className="download-component">
          <a
            className="download-button"
            href={file}
            download={filename}
            target="_blank"
          >
            Download
          </a>
        </div>
      ) : (
        <p>Downloading file...</p>
      )}
    </div>
  )
}

export default IPFSDownload
