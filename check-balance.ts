import 'dotenv/config'
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { getKeypairFromEnvironment } from '@solana-developers/helpers'

const address = process.argv[2] ? 
	new PublicKey(process.argv[2]) :
 	getKeypairFromEnvironment('SECRET_KEY').publicKey

const conn = new Connection('https://api.devnet.solana.com', 'confirmed')
const balanceInLamports = await conn.getBalance(address)
const balanceInSols = balanceInLamports / LAMPORTS_PER_SOL 
console.log(`💰 Finished! The balance of ${address.toBase58()} address is ${balanceInSols}`)
