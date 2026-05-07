import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Coins,
  FileText,
  Lock,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  User,
  Wallet,
} from 'lucide-react'

const KAKAO_OPENCHAT_URL = 'https://open.kakao.com/o/sample'
const TELEGRAM_URL = 'https://t.me/sample'

const coins = [
  { symbol: 'USDT', name: 'Tether', network: 'TRC20 / ERC20 / BEP20' },
  { symbol: 'BTC', name: 'Bitcoin', network: 'Bitcoin Network' },
  { symbol: 'ETH', name: 'Ethereum', network: 'ERC20' },
  { symbol: 'XRP', name: 'Ripple', network: 'XRP Ledger' },
  { symbol: 'TRX', name: 'TRON', network: 'TRC20' },
]

const steps = [
  { title: '신청서 작성', desc: '코인 종류, 금액, 지갑 주소, 연락처를 입력합니다.' },
  { title: '상담 확인', desc: '담당자가 거래 가능 여부와 수수료를 안내합니다.' },
  { title: '본인 확인', desc: '필요 시 안전거래를 위한 확인 절차를 진행합니다.' },
  { title: '전송 완료', desc: '입금 확인 후 고객 지갑으로 코인을 전송합니다.' },
]

const faqs = [
  {
    q: '구매 신청 후 얼마나 걸리나요?',
    a: '상담 확인, 입금 확인, 지갑 주소 검수 후 순차적으로 처리됩니다. 처리 시간은 네트워크 상황과 확인 절차에 따라 달라질 수 있습니다.',
  },
  {
    q: '본인 명의가 아니어도 신청 가능한가요?',
    a: '불법 자금, 대리 거래, 타인 명의 거래는 제한됩니다. 안전한 거래를 위해 본인 확인 절차가 필요할 수 있습니다.',
  },
  {
    q: '수수료는 어떻게 계산되나요?',
    a: '구매 금액, 코인 종류, 네트워크 수수료, 처리 방식에 따라 달라집니다. 최종 수수료는 상담 후 안내됩니다.',
  },
  {
    q: '지갑 주소를 잘못 입력하면 어떻게 되나요?',
    a: '블록체인 전송은 취소가 어렵습니다. 전송 전 주소와 네트워크를 반드시 다시 확인해야 합니다.',
  },
]

function Button({ children, className = '', variant = 'primary', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-2xl px-5 py-3 font-bold transition active:scale-[0.99]'
  const styles =
    variant === 'outline'
      ? 'border border-white/15 bg-white/5 text-white hover:bg-white/10'
      : 'bg-emerald-400 text-slate-950 hover:bg-emerald-300'
  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  )
}

function Card({ children, className = '' }) {
  return <div className={`rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-xl ${className}`}>{children}</div>
}

function formatKRW(value) {
  const num = Number(value || 0)
  if (!num) return '0원'
  return new Intl.NumberFormat('ko-KR').format(num) + '원'
}

export default function App() {
  const [form, setForm] = useState({
    coin: 'USDT',
    amount: '1000000',
    network: 'TRC20',
    wallet: '',
    kakao: '',
    phone: '',
    name: '',
    agree: false,
  })

  const estimatedFee = useMemo(() => {
    const amount = Number(form.amount || 0)
    if (!amount) return 0
    if (amount < 500000) return Math.max(12000, Math.round(amount * 0.05))
    if (amount < 3000000) return Math.round(amount * 0.04)
    if (amount < 10000000) return Math.round(amount * 0.03)
    return Math.round(amount * 0.025)
  }, [form.amount])

  const totalEstimate = Number(form.amount || 0) + estimatedFee
  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.agree) {
      alert('안전거래 확인 문구에 동의해 주세요.')
      return
    }
    const message = encodeURIComponent(
      `[Korea Coin Desk 상담 신청]\n이름: ${form.name}\n코인: ${form.coin}\n금액: ${formatKRW(form.amount)}\n네트워크: ${form.network}\n지갑주소: ${form.wallet}\n연락처: ${form.phone}\n카카오/텔레그램: ${form.kakao}`,
    )
    window.location.href = `${KAKAO_OPENCHAT_URL}?text=${message}`
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/20">
              <Coins className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-black tracking-tight">Korea Coin Desk</p>
              <p className="text-xs text-slate-400">Crypto Purchase Consulting</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#service" className="hover:text-white">서비스</a>
            <a href="#request" className="hover:text-white">구매신청</a>
            <a href="#notice" className="hover:text-white">안내사항</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </nav>
          <a href={KAKAO_OPENCHAT_URL} target="_blank" rel="noreferrer">
            <Button className="hidden sm:inline-flex">
              <MessageCircle className="mr-2 h-4 w-4" /> 상담하기
            </Button>
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(52,211,153,0.25),transparent_38%),radial-gradient(circle_at_top_left,rgba(59,130,246,0.2),transparent_32%)]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-200">
                <ShieldCheck className="h-4 w-4" /> 안전 확인 기반 코인 구매 상담
              </div>
              <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
                빠르고 명확한
                <span className="block text-emerald-300">코인 구매 상담</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                USDT, BTC, ETH, XRP 등 주요 코인 구매 상담을 신청하고, 담당자 확인 후 안전하게 절차를 진행하세요.
                모든 거래는 본인 확인과 지갑 주소 검수를 우선합니다.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#request">
                  <Button className="w-full sm:w-auto">
                    구매 상담 신청 <Send className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                <a href={TELEGRAM_URL} target="_blank" rel="noreferrer">
                  <Button variant="outline" className="w-full sm:w-auto">텔레그램 상담 연결</Button>
                </a>
              </div>
              <div className="mt-8 grid max-w-lg grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-black">24H</p>
                  <p className="text-xs text-slate-400">상담 접수</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-black">5+</p>
                  <p className="text-xs text-slate-400">지원 코인</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-black">KYC</p>
                  <p className="text-xs text-slate-400">안전 확인</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.08 }}>
              <Card className="bg-white/10 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl">
                <div className="p-6 md:p-8">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-300">예상 견적</p>
                      <h2 className="text-2xl font-black text-white">수수료 계산기</h2>
                    </div>
                    <Wallet className="h-8 w-8 text-emerald-300" />
                  </div>
                  <label className="block">
                    <span className="mb-2 block text-sm text-slate-300">구매 희망 금액</span>
                    <input
                      value={form.amount}
                      onChange={(e) => update('amount', e.target.value.replace(/[^0-9]/g, ''))}
                      className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-4 text-lg font-bold text-white outline-none focus:border-emerald-300"
                      placeholder="예: 1000000"
                    />
                  </label>
                  <div className="mt-4 grid gap-3 rounded-3xl border border-white/10 bg-slate-900/70 p-5">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">구매금액</span>
                      <span className="font-semibold text-white">{formatKRW(form.amount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">예상 수수료</span>
                      <span className="font-semibold text-emerald-300">{formatKRW(estimatedFee)}</span>
                    </div>
                    <div className="h-px bg-white/10" />
                    <div className="flex justify-between text-base">
                      <span className="text-slate-200">예상 총액</span>
                      <span className="text-xl font-black text-white">{formatKRW(totalEstimate)}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-xs leading-5 text-slate-400">
                    실제 수수료는 코인 종류, 거래금액, 네트워크 수수료, 확인 절차에 따라 달라질 수 있습니다.
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        <section id="service" className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold text-emerald-300">SUPPORTED ASSETS</p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">지원 코인 및 네트워크</h2>
            </div>
            <p className="max-w-xl text-slate-400">전송 전 네트워크와 지갑 주소가 일치하는지 반드시 확인합니다.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-5">
            {coins.map((coin) => (
              <Card key={coin.symbol}>
                <div className="p-5">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-300/15 text-emerald-300">
                    <Coins className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-black">{coin.symbol}</h3>
                  <p className="mt-1 text-sm text-slate-300">{coin.name}</p>
                  <p className="mt-4 text-xs leading-5 text-slate-500">{coin.network}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.03]">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
            <div className="mb-10 text-center">
              <p className="text-sm font-bold text-emerald-300">PROCESS</p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">이용 절차</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-4">
              {steps.map((step, index) => (
                <div key={step.title} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-300 text-lg font-black text-slate-950">{index + 1}</div>
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="request" className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-[1.15fr_0.85fr] md:px-8">
          <Card>
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              <div className="mb-8">
                <p className="text-sm font-bold text-emerald-300">REQUEST FORM</p>
                <h2 className="mt-2 text-3xl font-black">코인 구매 상담 신청</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  아래 정보는 상담 접수용 샘플 폼입니다. 실제 운영 시 서버, 데이터베이스, 관리자 인증, 개인정보 암호화가 필요합니다.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm text-slate-300"><Coins className="h-4 w-4" /> 코인 선택</span>
                  <select value={form.coin} onChange={(e) => update('coin', e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-emerald-300">
                    {coins.map((coin) => <option key={coin.symbol}>{coin.symbol}</option>)}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm text-slate-300"><Wallet className="h-4 w-4" /> 네트워크</span>
                  <select value={form.network} onChange={(e) => update('network', e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-emerald-300">
                    <option>TRC20</option>
                    <option>ERC20</option>
                    <option>BEP20</option>
                    <option>Bitcoin</option>
                    <option>XRP Ledger</option>
                  </select>
                </label>
                <label className="block md:col-span-2">
                  <span className="mb-2 flex items-center gap-2 text-sm text-slate-300"><Wallet className="h-4 w-4" /> 받을 지갑 주소</span>
                  <input value={form.wallet} onChange={(e) => update('wallet', e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-emerald-300" placeholder="지갑 주소를 입력하세요" />
                </label>
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm text-slate-300"><User className="h-4 w-4" /> 이름</span>
                  <input value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-emerald-300" placeholder="홍길동" />
                </label>
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm text-slate-300"><Phone className="h-4 w-4" /> 연락처</span>
                  <input value={form.phone} onChange={(e) => update('phone', e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-emerald-300" placeholder="010-0000-0000" />
                </label>
                <label className="block md:col-span-2">
                  <span className="mb-2 flex items-center gap-2 text-sm text-slate-300"><MessageCircle className="h-4 w-4" /> 카카오톡 ID 또는 텔레그램</span>
                  <input value={form.kakao} onChange={(e) => update('kakao', e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-emerald-300" placeholder="상담 가능한 ID를 입력하세요" />
                </label>
              </div>

              <label className="mt-6 flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-sm leading-6 text-slate-300">
                <input type="checkbox" checked={form.agree} onChange={(e) => update('agree', e.target.checked)} className="mt-1" />
                <span>본인은 타인 명의 거래, 불법 자금 거래, 보이스피싱 관련 거래가 아니며, 지갑 주소와 네트워크 오류에 대한 위험을 확인했습니다.</span>
              </label>

              <Button type="submit" className="mt-6 w-full py-4 text-base font-black">
                상담 신청 접수하기 <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Card>

          <div className="space-y-5">
            <Card className="border-amber-300/20 bg-amber-300/10">
              <div className="p-6">
                <div className="mb-4 flex items-center gap-3 text-amber-200">
                  <AlertTriangle className="h-6 w-6" />
                  <h3 className="text-xl font-black">운영 전 필수 확인</h3>
                </div>
                <ul className="space-y-3 text-sm leading-6 text-slate-300">
                  <li>• 사업자 정보와 이용약관 표시</li>
                  <li>• 개인정보처리방침 및 보관 기간 명시</li>
                  <li>• 본인 확인 및 자금세탁 방지 절차</li>
                  <li>• 환불·취소·오입금 규정 안내</li>
                  <li>• 관리자 계정 2단계 인증 적용</li>
                </ul>
              </div>
            </Card>

            <Card id="notice">
              <div className="p-6">
                <div className="mb-5 flex items-center gap-3">
                  <FileText className="h-6 w-6 text-emerald-300" />
                  <h3 className="text-xl font-black">공지사항</h3>
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl bg-slate-900/70 p-4">
                    <p className="font-bold">지갑 주소 입력 주의 안내</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">코인 전송 전 네트워크와 주소를 반드시 확인해 주세요.</p>
                  </div>
                  <div className="rounded-2xl bg-slate-900/70 p-4">
                    <p className="font-bold">상담 가능 시간</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">신청은 24시간 가능하며, 담당자 확인 후 순차적으로 안내됩니다.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-bold text-emerald-300">FAQ</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">자주 묻는 질문</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((item) => (
              <Card key={item.q}>
                <div className="p-6">
                  <h3 className="flex items-start gap-3 text-lg font-bold"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-300" /> {item.q}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{item.a}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950 px-4 py-10 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-lg font-black">Korea Coin Desk</p>
            <p className="mt-2 text-sm text-slate-500">
              본 사이트는 상담 접수용 샘플 템플릿입니다. 실제 운영 전 법률·세무·AML 검토가 필요합니다.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300">
            <Lock className="h-4 w-4 text-emerald-300" /> Sample inquiry form
          </div>
        </div>
      </footer>
    </div>
  )
}
