'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [contentList, setContentList] = useState([])
  const [stats, setStats] = useState({
    essay: 0, viewpoint: 0, quote: 0, video: 0, article: 0, total: 0
  })
  const [output, setOutput] = useState('点击上方按钮生成内容...')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('lightbody_contentDB')
    if (saved) {
      setContentList(JSON.parse(saved))
    }
    const savedStats = localStorage.getItem('lightbody_stats')
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }
  }, [])

  const saveData = (newList, newStats) => {
    localStorage.setItem('lightbody_contentDB', JSON.stringify(newList))
    localStorage.setItem('lightbody_stats', JSON.stringify(newStats))
  }

  const generateContent = async (type) => {
    setLoading(true)
    setOutput('⏳ Kimi 2.5 正在生成深度内容，请稍候...')
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setOutput(data.content)
        const newItem = {
          id: Date.now().toString(),
          ...data
        }
        const newList = [newItem, ...contentList]
        setContentList(newList)
        const newStats = {
          ...stats,
          [type]: stats[type] + 1,
          total: stats.total + 1
        }
        setStats(newStats)
        saveData(newList, newStats)
      } else {
        setOutput('生成失败: ' + (data.message || '未知错误'))
      }
    } catch (error) {
      setOutput('请求失败: ' + error.message)
    }
    
    setLoading(false)
  }

  const styles = {
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '30px',
      fontFamily: "'Noto Serif SC', serif",
      background: 'linear-gradient(180deg, #0a0618 0%, #1a0f2e 50%, #0f0818 100%)',
      minHeight: '100vh',
      color: '#f8f8f8'
    },
    header: {
      textAlign: 'center',
      padding: '60px 40px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(212,175,55,0.15)',
      borderRadius: '24px',
      marginBottom: '40px'
    },
    logo: {
      fontSize: '3.5em',
      fontWeight: 700,
      background: 'linear-gradient(135deg, #F4E4BC 0%, #D4AF37 50%, #B8941F 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      margin: 0
    },
    nav: {
      display: 'flex',
      justifyContent: 'center',
      gap: '12px',
      marginTop: '30px',
      flexWrap: 'wrap'
    },
    navBtn: (active) => ({
      padding: '14px 28px',
      background: active ? 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(157,78,221,0.2))' : 'rgba(255,255,255,0.03)',
      border: active ? '1px solid #D4AF37' : '1px solid rgba(212,175,55,0.2)',
      borderRadius: '50px',
      color: active ? '#F4E4BC' : 'rgba(248,248,248,0.7)',
      cursor: 'pointer',
      fontSize: '0.95em',
      fontWeight: 500
    }),
    section: {
      display: 'block'
    },
    sectionTitle: {
      textAlign: 'center',
      fontSize: '2.2em',
      fontWeight: 600,
      marginBottom: '40px',
      color: '#D4AF37'
    },
    card: {
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(212,175,55,0.15)',
      borderRadius: '20px',
      padding: '30px',
      marginBottom: '25px'
    },
    btn: {
      padding: '14px 32px',
      background: 'linear-gradient(135deg, #D4AF37, #B8941F)',
      color: '#0a0618',
      border: 'none',
      borderRadius: '50px',
      fontSize: '0.95em',
      fontWeight: 600,
      cursor: 'pointer',
      margin: '5px'
    },
    btnSecondary: {
      padding: '14px 32px',
      background: 'transparent',
      color: '#D4AF37',
      border: '1.5px solid #D4AF37',
      borderRadius: '50px',
      fontSize: '0.95em',
      fontWeight: 600,
      cursor: 'pointer',
      margin: '5px'
    },
    output: {
      background: 'rgba(0,0,0,0.3)',
      border: '1px solid rgba(212,175,55,0.2)',
      borderRadius: '16px',
      padding: '25px',
      minHeight: '300px',
      whiteSpace: 'pre-wrap',
      lineHeight: 2,
      marginTop: '20px',
      fontSize: '1.05em'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
      gap: '20px',
      margin: '30px 0'
    },
    statCard: {
      textAlign: 'center',
      padding: '30px 20px',
      background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(157,78,221,0.05))',
      border: '1px solid rgba(212,175,55,0.15)',
      borderRadius: '16px'
    },
    statValue: {
      fontSize: '2.8em',
      fontWeight: 700,
      color: '#D4AF37'
    }
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>✦ 光体AI ✦</h1>
        <p style={{color: 'rgba(248,248,248,0.7)', marginTop: '15px', fontSize: '1.1em'}}>
          高级内容生成系统 · Kimi 2.5 驱动
        </p>
        <div style={styles.nav}>
          <button style={styles.navBtn(activeTab === 'dashboard')} onClick={() => setActiveTab('dashboard')}>
            📊 总览
          </button>
          <button style={styles.navBtn(activeTab === 'generate')} onClick={() => setActiveTab('generate')}>
            ✨ 手动生成
          </button>
          <button style={styles.navBtn(activeTab === 'library')} onClick={() => setActiveTab('library')}>
            📚 内容库 ({contentList.length})
          </button>
        </div>
      </header>

      {activeTab === 'dashboard' && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>内容生产总览</h2>
          
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{stats.essay}</div>
              <div style={{color: 'rgba(248,248,248,0.7)', fontSize: '0.9em'}}>核心论文</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{stats.viewpoint}</div>
              <div style={{color: 'rgba(248,248,248,0.7)', fontSize: '0.9em'}}>观点碎片</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{stats.quote}</div>
              <div style={{color: 'rgba(248,248,248,0.7)', fontSize: '0.9em'}}>神圣金句</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{stats.video}</div>
              <div style={{color: 'rgba(248,248,248,0.7)', fontSize: '0.9em'}}>短视频</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{stats.article}</div>
              <div style={{color: 'rgba(248,248,248,0.7)', fontSize: '0.9em'}}>长文章</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statValue}>{stats.total}</div>
              <div style={{color: 'rgba(248,248,248,0.7)', fontSize: '0.9em'}}>总计</div>
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={{color: '#D4AF37', marginBottom: '20px'}}>📝 最新生成内容</h3>
            {contentList.length === 0 ? (
              <p style={{color: 'rgba(248,248,248,0.5)', textAlign: 'center', padding: '40px'}}>
                暂无内容，请前往手动生成页面创建
              </p>
            ) : (
              contentList.slice(0, 5).map((item, index) => (
                <div key={item.id} style={{
                  padding: '15px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '10px',
                  marginBottom: '10px',
                  borderLeft: '3px solid #D4AF37'
                }}>
                  <div style={{fontWeight: 600, color: '#D4AF37'}}>
                    [{item.typeName}] {item.title}
                  </div>
                  <div style={{fontSize: '0.85em', color: 'rgba(248,248,248,0.6)', marginTop: '5px'}}>
                    {new Date(item.createdAt).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'generate' && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>手动生成内容</h2>
          
          <div style={styles.card}>
            <h3 style={{color: '#D4AF37', marginBottom: '20px'}}>选择生成类型</h3>
            <div style={{textAlign: 'center'}}>
              <button style={styles.btn} onClick={() => generateContent('essay')} disabled={loading}>
                📄 核心论文
              </button>
              <button style={styles.btn} onClick={() => generateContent('viewpoint')} disabled={loading}>
                💡 观点碎片
              </button>
              <button style={styles.btn} onClick={() => generateContent('quote')} disabled={loading}>
                ✨ 神圣金句
              </button>
              <button style={styles.btn} onClick={() => generateContent('video')} disabled={loading}>
                🎬 短视频
              </button>
              <button style={styles.btn} onClick={() => generateContent('article')} disabled={loading}>
                📝 长文章
              </button>
              <button style={styles.btn} onClick={() => generateContent('moments')} disabled={loading}>
                💬 朋友圈
              </button>
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={{color: '#D4AF37', marginBottom: '20px'}}>生成结果</h3>
            <div style={styles.output}>{output}</div>
            <div style={{textAlign: 'center', marginTop: '20px'}}>
              <button style={styles.btn} onClick={() => navigator.clipboard.writeText(output)}>
                📋 复制
              </button>
              <button style={styles.btnSecondary} onClick={() => setOutput('点击上方按钮生成内容...')}>
                🗑️ 清空
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'library' && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>内容库管理</h2>
          
          <div style={styles.card}>
            <h3 style={{color: '#D4AF37', marginBottom: '20px'}}>
              内容列表（{contentList.length} 条）
            </h3>
            {contentList.length === 0 ? (
              <p style={{color: 'rgba(248,248,248,0.5)', textAlign: 'center', padding: '40px'}}>
                暂无内容
              </p>
            ) : (
              contentList.map((item) => (
                <div key={item.id} style={{
                  padding: '20px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '14px',
                  marginBottom: '12px',
                  borderLeft: '3px solid #D4AF37'
                }}>
                  <div style={{fontWeight: 600, color: '#D4AF37', marginBottom: '8px'}}>
                    [{item.typeName}] {item.title}
                  </div>
                  <div style={{fontSize: '0.9em', color: 'rgba(248,248,248,0.8)', marginBottom: '10px'}}>
                    {item.content.substring(0, 100)}...
                  </div>
                  <div style={{fontSize: '0.8em', color: 'rgba(248,248,248,0.5)'}}>
                    {new Date(item.createdAt).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <footer style={{textAlign: 'center', padding: '50px 30px', marginTop: '60px', borderTop: '1px solid rgba(212,175,55,0.2)'}}>
        <div style={{fontSize: '1.6em', fontStyle: 'italic', color: 'rgba(248,248,248,0.8)', marginBottom: '20px'}}>
          "黑暗森林终会落幕，光体文明永恒存在"
        </div>
        <div style={{fontSize: '1.1em', color: '#D4AF37'}}>
          ✦ 光体文明发起人：金老师 ✦
        </div>
      </footer>
    </div>
  )
}
