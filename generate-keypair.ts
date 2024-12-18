import * as fs from 'fs'
import 'dotenv/config'
import { Keypair, PublicKey } from '@solana/web3.js'
import { getKeypairFromEnvironment } from '@solana-developers/helpers'

function generateNewKey() {
	const key = Keypair.generate();
	console.log(`🔆 New key generated: ${key.publicKey.toBase58()}`)
	fs.writeFileSync('.env', `SECRET_KEY=[${key.secretKey}]`)
	console.log(`🔆 key saved in ENV`)
	return keypair
}

function loadKey() {
	if (!process.env.SECRET_KEY)
		return null
	const key = getKeypairFromEnvironment('SECRET_KEY')
	console.log(`🔆 Existing key loaded from ENV: ${key.publicKey.toBase58()}`)
	return key
}


// === MAIN ==========
const keypair = loadKey() || generateNewKey()
console.log(`✅ Account loaded.`)
