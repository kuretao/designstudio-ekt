"use client";

export default function AgreementPage() {
  return (
    <div className="page-in pt-24">
      <section className="px-5 pb-10 pt-20 md:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#d7c4a1]">Документ</p>
          <h1 className="mb-12 text-5xl font-light leading-[0.92] tracking-[-0.055em] md:text-7xl">
            Согласие на обработку<br />персональных данных
          </h1>

          <div className="space-y-8 text-[#d8d1c4] leading-relaxed">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-8 md:p-12">
              <p className="text-lg leading-relaxed">
                Настоящим, действуя свободно, своей волей и в своём интересе, я даю согласие оператору —
                студии концептуального дизайна <span className="text-white">3D Smart Design Studio</span>,
                сайт&nbsp;
                <span className="text-[#d7c4a1]">3dsmartdesign.ru</span>, — на обработку моих персональных данных.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-light tracking-[-0.03em] text-white">Цель обработки</h2>
              <p>
                Обработка персональных данных осуществляется в целях предложения услуг, проведения опросов
                и маркетинговых исследований.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-light tracking-[-0.03em] text-white">Перечень действий</h2>
              <p>
                Я даю согласие на совершение в отношении моих персональных данных следующих действий:
              </p>
              <ul className="space-y-3">
                {[
                  "сбор и систематизацию",
                  "накопление и хранение",
                  "уточнение (обновление, изменение)",
                  "использование",
                  "передачу (предоставление, доступ)",
                  "обезличивание",
                  "блокирование и уничтожение",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#d7c4a1]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-light tracking-[-0.03em] text-white">Способы обработки</h2>
              <p>
                Обработка персональных данных осуществляется любым способом, в том числе как с использованием
                средств автоматизации, так и без использования таких средств с применением различных видов
                материальных носителей.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-light tracking-[-0.03em] text-white">Срок действия согласия</h2>
              <p>
                Настоящее согласие действует с момента его предоставления и до достижения целей обработки
                персональных данных или до момента его отзыва.
              </p>
              <p>
                Отзыв согласия осуществляется путём направления соответствующего уведомления по адресу
                электронной почты оператора:{" "}
                <a
                  href="mailto:3dsmartdesign@bk.ru"
                  className="text-[#d7c4a1] transition hover:text-white"
                >
                  3dsmartdesign@bk.ru
                </a>
                .
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-8">
              <h2 className="mb-4 text-xl font-light tracking-[-0.03em] text-white">Контактные данные оператора</h2>
              <div className="space-y-2 text-sm text-white/60">
                <p>Студия концептуального дизайна <span className="text-white/80">3D Smart Design Studio</span></p>
                <p>Сайт: <span className="text-[#d7c4a1]">3dsmartdesign.ru</span></p>
                <p>Телефон: <span className="text-white/80">+7 (987) 942-12-42</span></p>
                <p>Email: <span className="text-white/80">3dsmartdesign@bk.ru</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
