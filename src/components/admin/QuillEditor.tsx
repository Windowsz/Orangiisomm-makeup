'use client'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const TOOLBAR = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['link', 'image'],
  ['clean'],
]

interface QuillEditorProps {
  value: string
  onChange: (html: string) => void
  height?: number
}

export default function QuillEditor({ value, onChange, height = 320 }: QuillEditorProps) {
  return (
    <div className="quill-wrapper">
      <style>{`
        .quill-wrapper .ql-toolbar.ql-snow {
          border-color: #e5e7eb;
          border-radius: 0.75rem 0.75rem 0 0;
          background: #f9fafb;
          font-family: inherit;
        }
        .quill-wrapper .ql-container.ql-snow {
          border-color: #e5e7eb;
          border-radius: 0 0 0.75rem 0.75rem;
          font-family: inherit;
          font-size: 0.875rem;
        }
        .quill-wrapper .ql-editor {
          min-height: ${height}px;
          line-height: 1.7;
        }
        .quill-wrapper .ql-editor:focus {
          outline: none;
          box-shadow: 0 0 0 2px #C9A96E;
        }
      `}</style>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={{ toolbar: TOOLBAR }}
        formats={['header', 'bold', 'italic', 'underline', 'strike', 'color', 'background', 'align', 'list', 'bullet', 'link', 'image']}
      />
    </div>
  )
}
