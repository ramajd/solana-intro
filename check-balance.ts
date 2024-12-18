import 'dotenv/config'
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import { getKeypairFromEnvironment } from '@solana-developers/helpers'

const keypair = getKeypairFromEnvironment('SECRET_KEY')

const conn = new Connection('https://api.devnet.solana.com', 'confirmed')
const balanceInLamports = await conn.getBalance(keypair.publicKey)
const balanceInSols = balanceInLamports / LAMPORTS_PER_SOL 
console.log(`💰 Finished! The balance of ${keypair.publicKey.toBase58()} address is ${balanceInSols}`)
