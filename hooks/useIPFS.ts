const useIPFS = (hash: string, filename: string) =>
  `https://gateway.ipfscdn.io/ipfs/${hash}?filename=${filename}`

export default useIPFS
