import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'

export const Navbar = () => {
  const { publicKey, disconnect } = useWallet()

  return (
    <header>
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
        <div className="sm:justify-between sm:items-center sm:flex">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold sm:text-3xl">Solana Pay Store</h1>

            <p className="mt-1.5 text-sm text-gray-500">
              Let's buy something! 🎉
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:mt-0 sm:items-center">
            {publicKey ? (
              <button
                className="block px-5 py-3 text-sm font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring"
                onClick={disconnect}
              >
                Logout
              </button>
            ) : (
              <WalletMultiButton className="block px-5 py-3 text-sm font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring" />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
