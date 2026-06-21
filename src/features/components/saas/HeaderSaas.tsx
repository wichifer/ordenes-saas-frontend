export default function HeaderSaas() {
  return (
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">

      <div>
        <h2 className="text-xl font-semibold">
          Panel Admin SaaS
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-medium">
            ADMIN_SAAS
          </p>

          <p className="text-sm text-gray-500">
            administrador@t420.com
          </p>
        </div>

        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center">
          A
        </div>
      </div>

    </header>
  );
}