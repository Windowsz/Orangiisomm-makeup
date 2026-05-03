'use client'

import { useEffect, useRef } from 'react'
import 'quill/dist/quill.snow.css'
import type Quill from 'quill'

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
  const containerRef = useRef<HTMLDivElement>(null)
  const quillRef = useRef<Quill | null>(null)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useEffect(() => {
    if (!containerRef.current || quillRef.current) return

    import('quill').then(({ default: QuillClass }) => {
      if (!containerRef.current || quillRef.current) return

      const q = new QuillClass(containerRef.current, {
        theme: 'snow',
        modules: { toolbar: TOOLBAR },
        formats: ['header', 'bold', 'italic', 'underline', 'strike', 'color', 'background', 'align', 'list', 'link', 'image'],
      })

      q.root.innerHTML = value
      quillRef.current = q

      q.on('text-change', () => {
        onChangeRef.current(q.root.innerHTML)
      })
    })

    return () => {
      quillRef.current = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sync value when switching between Rich Text / HTML Source modes
  const prevValueRef = useRef(value)
  useEffect(() => {
    if (quillRef.current && prevValueRef.current !== value) {
      if (quillRef.current.root.innerHTML !== value) {
        quillRef.current.root.innerHTML = value
      }
    }
    prevValueRef.current = value
  }, [value])

  return (
    <>
      <style>{`
        .ql-toolbar.ql-snow {
          border-color: #e5e7eb !important;
          border-radius: 0.75rem 0.75rem 0 0;
          background: #f9fafb;
          font-family: inherit;
        }
        .ql-container.ql-snow {
          border-color: #e5e7eb !important;
          border-radius: 0 0 0.75rem 0.75rem;
          font-family: inherit;
          font-size: 0.875rem;
        }
        .ql-editor {
          min-height: ${height}px;
          line-height: 1.7;
        }
        .ql-editor.ql-blank::before { color: #9ca3af; }
      `}</style>
      <div ref={containerRef} />
    </>
  )
}
