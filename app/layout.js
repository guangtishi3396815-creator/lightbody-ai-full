export const metadata = {
  title: '光体AI · 完整版',
  description: '高级内容生成系统',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{margin: 0, padding: 0, fontFamily: "'Noto Serif SC', serif"}}>{children}</body>
    </html>
  )
}
