import {
	Connection,
	Transaction,
	SystemProgram,
	sendAndConfirmTransaction,
	PublicKey
} from '@solana/web3.js'
import 'dotenv/config'
import { getKeypairFromEnvironment } from '@solana-developers/helpers'

const suppliedPublicKey = process.argv[2] || null
if (!suppliedPublicKey) {
	console.log(`⚠️  Please provide a public key to send to`);
	process.exit(1)
}

const senderKeypair = getKeypairFromEnvironment('SECRET_KEY')

const toPubkey = new PublicKey(suppliedPublicKey)
console.log(`🔆 send from = ${senderKeypair.publicKey}`)
console.log(`🔆 suppliedPublicKey = ${toPubkey}`)

const conn = new Connection('https://api.devnet.solana.com', 'confirmed')
console.log(`✅ Loaded the keypairs and connection to DEVNET`)

const transaction = new Transaction()
const LAMPORTS_TO_SEND = 5000
const sendInstruction = SystemProgram.transfer({
	fromPubkey: senderKeypair.publicKey,
	toPubkey,
	lamports: LAMPORTS_TO_SEND,
})

transaction.add(sendInstruction)
const signature = await sendAndConfirmTransaction(conn, transaction, [
	senderKeypair
])
console.log(`💸 Finished! Sent ${LAMPORTS_TO_SEND} to address ${toPubkey}`)
console.log(`✍️ Transaction signature is ${signature}`)

