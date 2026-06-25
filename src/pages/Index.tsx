import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const TERMINAL_IMG = 'https://cdn.poehali.dev/projects/064025c6-67f1-4437-af8a-3c861b4f5eaa/files/46df3416-0212-4668-a490-3ba341a96137.jpg';
const PRINTER_IMG = 'https://cdn.poehali.dev/projects/064025c6-67f1-4437-af8a-3c861b4f5eaa/files/12f0fe88-f0bf-4cfc-9371-21ae9ab32932.jpg';

type Category = 'all' | 'terminals' | 'printers';

interface Product {
  id: number;
  name: string;
  cat: 'terminals' | 'printers';
  img: string;
  price: string;
  os: string;
  screen: string;
  scan: string;
  proto: boolean;
  tag?: string;
}

const PRODUCTS: Product[] = [
  { id: 1, name: 'ScanPro X5', cat: 'terminals', img: TERMINAL_IMG, price: '42 900', os: 'Android 13', screen: '5.0"', scan: '2D', proto: true, tag: 'ХИТ' },
  { id: 2, name: 'ScanPro M3', cat: 'terminals', img: TERMINAL_IMG, price: '31 500', os: 'Android 11', screen: '4.0"', scan: '2D', proto: true },
  { id: 3, name: 'DataForce R8', cat: 'terminals', img: TERMINAL_IMG, price: '58 200', os: 'Android 14', screen: '6.0"', scan: '2D', proto: true, tag: 'NEW' },
  { id: 4, name: 'LabelJet T200', cat: 'printers', img: PRINTER_IMG, price: '18 700', os: '—', screen: '203 dpi', scan: 'Термо', proto: true },
  { id: 5, name: 'LabelJet T400', cat: 'printers', img: PRINTER_IMG, price: '27 400', os: '—', screen: '300 dpi', scan: 'Термотрансфер', proto: true, tag: 'ХИТ' },
  { id: 6, name: 'PrintMax G6', cat: 'printers', img: PRINTER_IMG, price: '49 900', os: '—', screen: '600 dpi', scan: 'Промышленный', proto: true, tag: 'NEW' },
];

const NAV = [
  { id: 'home', label: 'Главная' },
  { id: 'catalog', label: 'Каталог' },
  { id: 'compare', label: 'Сравнение' },
  { id: 'support', label: 'Поддержка' },
  { id: 'about', label: 'О компании' },
  { id: 'contacts', label: 'Контакты' },
];

const Index = () => {
  const [category, setCategory] = useState<Category>('all');
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const filtered = PRODUCTS.filter((p) => category === 'all' || p.cat === category);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-md bg-primary text-primary-foreground">
              <Icon name="ScanLine" size={20} />
            </div>
            <span className="font-display font-700 text-xl tracking-wide">SCAN<span className="text-primary">TECH</span></span>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button onClick={() => scrollTo('contacts')} className="hidden sm:flex font-medium">
              Связаться
            </Button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2">
              <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-border bg-background animate-fade-in">
            <div className="container py-3 flex flex-col">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  onClick={() => scrollTo(n.id)}
                  className="py-3 text-left text-muted-foreground hover:text-primary transition-colors"
                >
                  {n.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 grid-bg animate-grid-flow opacity-60" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px] animate-glow-pulse" />
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge variant="outline" className="mb-6 border-primary/40 text-primary">
                <Icon name="Wrench" size={14} className="mr-1" /> Продажа и сервисное обслуживание
              </Badge>
              <h1 className="font-display font-700 text-5xl md:text-7xl leading-[0.95] tracking-tight">
                ТЕРМИНАЛЫ <br />И ПРИНТЕРЫ <br />
                <span className="text-primary text-glow">С СЕРВИСОМ ПОД КЛЮЧ</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-md">
                Продаём и полностью обслуживаем оборудование для сбора данных
                и печати этикеток.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" onClick={() => scrollTo('support')} className="font-medium">
                  Услуги сервиса
                  <Icon name="ArrowRight" size={18} className="ml-1" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollTo('catalog')} className="font-medium border-border">
                  Открыть каталог
                </Button>
              </div>
              <div className="mt-10 grid grid-cols-3 gap-6 max-w-sm">
                {[
                  { v: '3 дня', l: 'срок ремонта' },
                  { v: 'Выезд', l: 'инженера' },
                  { v: '2 года', l: 'гарантия' },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="font-display font-700 text-3xl text-primary">{s.v}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
              <img
                src={TERMINAL_IMG}
                alt="Терминал сбора данных"
                className="relative w-full max-w-md mx-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-12 border-y border-border bg-card/30">
        <div className="container grid sm:grid-cols-2 gap-6">
          {[
            { cat: 'terminals' as Category, title: 'Терминалы сбора данных', desc: 'Мобильные ТСД на Android для склада и торговли', icon: 'Smartphone', img: TERMINAL_IMG },
            { cat: 'printers' as Category, title: 'Принтеры этикеток', desc: 'Термо и термотрансферная печать любой сложности', icon: 'Printer', img: PRINTER_IMG },
          ].map((c) => (
            <button
              key={c.cat}
              onClick={() => { setCategory(c.cat); scrollTo('catalog'); }}
              className="group relative flex items-center gap-5 p-6 rounded-xl border border-border bg-card overflow-hidden text-left hover:glow-border transition-all duration-300"
            >
              <img src={c.img} alt={c.title} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-1">
                <div className="flex items-center gap-2 text-primary mb-1">
                  <Icon name={c.icon} size={18} />
                  <span className="text-xs uppercase tracking-widest">Категория</span>
                </div>
                <h3 className="font-display font-600 text-xl">{c.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
              </div>
              <Icon name="ArrowUpRight" size={22} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          ))}
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-20">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-primary text-sm uppercase tracking-widest">Каталог</span>
              <h2 className="font-display font-700 text-4xl md:text-5xl mt-2">ОБОРУДОВАНИЕ</h2>
            </div>
            <div className="flex gap-2 p-1 rounded-lg border border-border bg-card">
              {[
                { id: 'all' as Category, label: 'Все' },
                { id: 'terminals' as Category, label: 'Терминалы' },
                { id: 'printers' as Category, label: 'Принтеры' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setCategory(f.id)}
                  className={`px-4 py-2 text-sm rounded-md transition-colors ${
                    category === f.id
                      ? 'bg-primary text-primary-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <Card
                key={p.id}
                className="group relative overflow-hidden border-border bg-card hover:glow-border transition-all duration-300 animate-fade-in"
              >
                {p.tag && (
                  <Badge className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground font-600">
                    {p.tag}
                  </Badge>
                )}
                <div className="relative h-52 bg-gradient-to-b from-secondary/40 to-card overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                    <Icon name={p.cat === 'terminals' ? 'Smartphone' : 'Printer'} size={14} />
                    {p.cat === 'terminals' ? 'Терминал сбора данных' : 'Принтер этикеток'}
                  </div>
                  <h3 className="font-display font-600 text-xl">{p.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="secondary" className="text-xs">{p.os}</Badge>
                    <Badge variant="secondary" className="text-xs">{p.screen}</Badge>
                    <Badge variant="secondary" className="text-xs">{p.scan}</Badge>
                  </div>
                  <div className="flex items-center justify-between mt-5">
                    <div>
                      <span className="text-xs text-muted-foreground">от</span>
                      <div className="font-display font-700 text-2xl">{p.price} <span className="text-base">₽</span></div>
                    </div>
                    <Button size="sm" className="font-medium">
                      <Icon name="ShoppingCart" size={16} className="mr-1" /> Купить
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <section id="compare" className="py-20 border-t border-border bg-card/30">
        <div className="container">
          <span className="text-primary text-sm uppercase tracking-widest">Сравнение</span>
          <h2 className="font-display font-700 text-4xl md:text-5xl mt-2 mb-10">ПОДБЕРИ МОДЕЛЬ</h2>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="bg-secondary/50 text-left">
                  <th className="p-4 font-600">Модель</th>
                  <th className="p-4 font-600">Тип</th>
                  <th className="p-4 font-600">ОС / Разрешение</th>
                  <th className="p-4 font-600">Экран / DPI</th>
                  <th className="p-4 font-600">Сканер / Печать</th>
                  <th className="p-4 font-600 text-right">Цена</th>
                </tr>
              </thead>
              <tbody>
                {PRODUCTS.map((p) => (
                  <tr key={p.id} className="border-t border-border hover:bg-secondary/30 transition-colors">
                    <td className="p-4 font-display font-600 text-base">{p.name}</td>
                    <td className="p-4 text-muted-foreground">{p.cat === 'terminals' ? 'Терминал' : 'Принтер'}</td>
                    <td className="p-4 text-muted-foreground">{p.os}</td>
                    <td className="p-4 text-muted-foreground">{p.screen}</td>
                    <td className="p-4 text-muted-foreground">{p.scan}</td>
                    <td className="p-4 text-right font-display font-700 text-primary">{p.price} ₽</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SUPPORT — сервисное обслуживание */}
      <section id="support" className="py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="container relative">
          <div className="max-w-2xl mb-12">
            <span className="text-primary text-sm uppercase tracking-widest">Сервисное обслуживание</span>
            <h2 className="font-display font-700 text-4xl md:text-5xl mt-2 mb-4">
              ВАШЕ ОБОРУДОВАНИЕ <span className="text-primary text-glow">ВСЕГДА В СТРОЮ</span>
            </h2>
            <p className="text-muted-foreground">
              Берём на себя весь жизненный цикл оборудования — от настройки до ремонта.
              Собственный сервисный центр, подменный фонд и инженеры с выездом к вам.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {[
              { icon: 'Wrench', title: 'Ремонт и диагностика', desc: 'Восстановим терминалы и принтеры любой сложности. Средний срок — 7 дней.' },
              { icon: 'Truck', title: 'Выезд инженера', desc: 'Специалист приедет на объект для обслуживания и пуско-наладки.' },
            ].map((s) => (
              <Card key={s.title} className="p-6 border-border bg-card hover:glow-border transition-all duration-300 group">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                  <Icon name={s.icon} size={24} />
                </div>
                <h3 className="font-display font-600 text-lg">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
              </Card>
            ))}
          </div>

          <div className="mb-16">
            <h3 className="font-display font-600 text-2xl mb-8 text-center">Как проходит обслуживание</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { n: '01', icon: 'PhoneCall', t: 'Заявка', d: 'Оставляете заявку или звоните' },
                { n: '02', icon: 'Search', t: 'Диагностика', d: 'Определяем причину и сроки' },
                { n: '03', icon: 'Wrench', t: 'Ремонт', d: 'Чиним' },
                { n: '04', icon: 'CheckCircle2', t: 'Выдача', d: 'Возвращаем с гарантией' },
              ].map((s) => (
                <div key={s.n} className="relative p-6 rounded-xl border border-border bg-card">
                  <span className="absolute top-4 right-5 font-display font-700 text-4xl text-primary/15">{s.n}</span>
                  <Icon name={s.icon} size={26} className="text-primary mb-4" />
                  <h4 className="font-600 text-lg">{s.t}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{s.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="font-display font-600 text-2xl mb-4">Частые вопросы по сервису</h3>
              <Accordion type="single" collapsible className="w-full">
                {[
                  { q: 'Сколько занимает ремонт?', a: 'Средний срок — 7 рабочих дней. На сложные случаи сообщаем срок после диагностики. На время ремонта выдаём подменное оборудование.' },
                  { q: 'Обслуживаете технику не из вашего каталога?', a: 'Да, ремонтируем и обслуживаем терминалы и принтеры большинства производителей, даже если вы покупали их не у нас.' },
                  { q: 'Как работает договор на обслуживание?', a: 'Заключаем сервисный контракт с регулярным ТО, приоритетной поддержкой и фиксированной стоимостью — без сюрпризов в бюджете.' },
                  { q: 'Есть ли гарантия на ремонт?', a: 'На все выполненные работы и заменённые детали даём гарантию. На новое оборудование — 2 года.' },
                ].map((f, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-border">
                    <AccordionTrigger className="text-left hover:text-primary">{f.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <Card className="p-8 border-border bg-card glow-border">
              <Icon name="Headset" size={32} className="text-primary mb-4" />
              <h3 className="font-display font-600 text-2xl mb-2">Нужен сервис?</h3>
              <p className="text-muted-foreground mb-6">
                Оставьте заявку — инженер свяжется с вами, оценит проблему и предложит решение.
              </p>
              <Button size="lg" onClick={() => scrollTo('contacts')} className="w-full font-medium">
                Оставить заявку на сервис
                <Icon name="ArrowRight" size={18} className="ml-1" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 border-t border-border bg-card/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary text-sm uppercase tracking-widest">О компании</span>
              <h2 className="font-display font-700 text-4xl md:text-5xl mt-2 mb-6">
                14 ЛЕТ НА РЫНКЕ <span className="text-primary text-glow">АВТОМАТИЗАЦИИ</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                SCANTECH — поставщик оборудования для сбора данных и маркировки.
                Мы помогаем складам, магазинам и производствам ускорять процессы
                с помощью передовых технологий идентификации.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { v: '14', l: 'лет опыта' },
                  { v: '3 000+', l: 'клиентов' },
                  { v: '50+', l: 'городов' },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="font-display font-700 text-4xl text-primary">{s.v}</div>
                    <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: 'ShieldCheck', t: 'Гарантия качества' },
                { icon: 'Truck', t: 'Доставка по РФ' },
                { icon: 'BadgeCheck', t: 'Официальный дилер' },
                { icon: 'Cpu', t: 'Передовые технологии' },
              ].map((c) => (
                <Card key={c.t} className="p-6 border-border bg-card flex flex-col items-center text-center gap-3 hover-scale">
                  <Icon name={c.icon} size={32} className="text-primary" />
                  <span className="font-600">{c.t}</span>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20">
        <div className="container grid lg:grid-cols-2 gap-12">
          <div>
            <span className="text-primary text-sm uppercase tracking-widest">Контакты</span>
            <h2 className="font-display font-700 text-4xl md:text-5xl mt-2 mb-8">СВЯЖИТЕСЬ С НАМИ</h2>
            <div className="space-y-5">
              {[
                { icon: 'Phone', label: 'Телефон', value: '8 800 555-35-35' },
                { icon: 'Mail', label: 'Почта', value: 'sales@scantech.ru' },
                { icon: 'MapPin', label: 'Офис', value: 'Москва, ул. Технологическая, 12' },
                { icon: 'Clock', label: 'Режим работы', value: 'Пн–Пт 9:00–19:00' },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary shrink-0">
                    <Icon name={c.icon} size={22} />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">{c.label}</div>
                    <div className="font-600 text-lg">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card className="p-8 border-border bg-card glow-border">
            <h3 className="font-display font-600 text-2xl mb-6">Оставить заявку</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Ваше имя" className="bg-secondary/50 border-border" />
              <Input placeholder="Телефон или email" className="bg-secondary/50 border-border" />
              <Textarea placeholder="Какое оборудование вас интересует?" rows={4} className="bg-secondary/50 border-border" />
              <Button type="submit" size="lg" className="w-full font-medium">
                Отправить заявку
                <Icon name="Send" size={18} className="ml-1" />
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground">
              <Icon name="ScanLine" size={18} />
            </div>
            <span className="font-display font-700 text-lg">SCAN<span className="text-primary">TECH</span></span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 SCANTECH. Оборудование для автоматизации.</p>
          <div className="flex gap-3">
            {['Send', 'MessageCircle', 'Phone'].map((i) => (
              <button key={i} className="flex items-center justify-center w-9 h-9 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Icon name={i} size={18} />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;