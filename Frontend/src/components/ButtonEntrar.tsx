export const ButtonEntrar = ({ onClick, loading }: { onClick: () => void; loading: boolean }) => {
    return (
        
              <button
            onClick={onClick}
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-500 active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
            
          </button>
    )
}
        