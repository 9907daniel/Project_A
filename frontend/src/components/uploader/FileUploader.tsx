'use client'
import React, { useCallback } from 'react'
import { useDropzone, FileRejection } from 'react-dropzone'

interface FileUploaderProps {
  onFileUpload: (files: File[]) => void
}

export default function FileUploader(props: FileUploaderProps) {
  const { onFileUpload } = props
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles)
      }
    },
    [onFileUpload],
  )

  const handleRejected = useCallback((fileRejections: FileRejection[]) => {
    alert('정해진 파일 형식만 업로드 가능합니다!')
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
    },
    noKeyboard: false,
    onDrop: handleDrop,
    onDropRejected: handleRejected,
  })

  return (
    <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''} border-2`}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="bg-black text-white">포트폴리오 업로드 중...</p>
      ) : (
        <p>파일을 드래그하거나 클릭해서 업로드 하세요</p>
      )}
    </div>
  )
}
