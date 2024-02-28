use std::sync::OnceLock;

use alloy_primitives::keccak256;
use alloy_rlp::RlpEncodable;
use k256::SecretKey;

use crate::{
    signature::{Signature, SignatureError},
    transaction::{
        fake_signature::make_fake_signature, kind::TransactionKind, signed::LegacySignedTransaction,
    },
    Address, Bytes, B256, U256,
};

#[derive(Clone, Debug, PartialEq, Eq, RlpEncodable)]
pub struct LegacyTransactionRequest {
    // The order of these fields determines encoding order.
    pub nonce: u64,
    pub gas_price: U256,
    pub gas_limit: u64,
    pub kind: TransactionKind,
    pub value: U256,
    pub input: Bytes,
}

impl LegacyTransactionRequest {
    /// Computes the hash of the transaction.
    pub fn hash(&self) -> B256 {
        keccak256(alloy_rlp::encode(self))
    }

    /// Signs the transaction with the provided secret key.
    pub fn sign(self, secret_key: &SecretKey) -> Result<LegacySignedTransaction, SignatureError> {
        let hash = self.hash();

        let signature = Signature::new(hash, secret_key)?;

        Ok(LegacySignedTransaction {
            nonce: self.nonce,
            gas_price: self.gas_price,
            gas_limit: self.gas_limit,
            kind: self.kind,
            value: self.value,
            input: self.input,
            signature,
            hash: OnceLock::new(),
            is_fake: false,
        })
    }

    /// Creates a fake signature for an impersonated account.
    pub fn fake_sign(self, sender: &Address) -> LegacySignedTransaction {
        let signature = make_fake_signature::<0>(sender);

        LegacySignedTransaction {
            nonce: self.nonce,
            gas_price: self.gas_price,
            gas_limit: self.gas_limit,
            kind: self.kind,
            value: self.value,
            input: self.input,
            signature,
            hash: OnceLock::new(),
            is_fake: true,
        }
    }
}

impl From<&LegacySignedTransaction> for LegacyTransactionRequest {
    fn from(tx: &LegacySignedTransaction) -> Self {
        Self {
            nonce: tx.nonce,
            gas_price: tx.gas_price,
            gas_limit: tx.gas_limit,
            kind: tx.kind,
            value: tx.value,
            input: tx.input.clone(),
        }
    }
}

#[cfg(test)]
mod tests {
    use std::str::FromStr;

    use super::*;
    use crate::transaction::fake_signature::tests::test_fake_sign_properties;

    fn dummy_request() -> LegacyTransactionRequest {
        let to = Address::from_str("0xc014ba5ec014ba5ec014ba5ec014ba5ec014ba5e").unwrap();
        let input = hex::decode("1234").unwrap();
        LegacyTransactionRequest {
            nonce: 1,
            gas_price: U256::from(2),
            gas_limit: 3,
            kind: TransactionKind::Call(to),
            value: U256::from(4),
            input: Bytes::from(input),
        }
    }

    #[test]
    fn test_legacy_transaction_request_encoding() {
        // Generated by Hardhat
        let expected =
            hex::decode("dc01020394c014ba5ec014ba5ec014ba5ec014ba5ec014ba5e04821234").unwrap();

        let request = dummy_request();

        let encoded = alloy_rlp::encode(&request);
        assert_eq!(expected, encoded);
    }

    #[test]
    fn test_legacy_transaction_request_hash() {
        // Generated by hardhat
        let expected = B256::from_slice(
            &hex::decode("41a46eddeeb251dc89bfe9d59ad27413909630a4c973dbdbbf23ab4aeed02818")
                .unwrap(),
        );

        let request = dummy_request();
        assert_eq!(expected, request.hash());
    }

    test_fake_sign_properties!();

    #[test]
    fn test_fake_sign_test_vector() -> anyhow::Result<()> {
        let transaction = LegacyTransactionRequest {
            nonce: 0,
            gas_price: U256::from(678_912),
            gas_limit: 30_000,
            kind: TransactionKind::Call("0xb5bc06d4548a3ac17d72b372ae1e416bf65b8ead".parse()?),
            value: U256::from(1),
            input: Bytes::default(),
        };

        let fake_sender: Address = "0xa5bc06d4548a3ac17d72b372ae1e416bf65b8ead".parse()?;

        let signed = transaction.fake_sign(&fake_sender);

        // Generated by Hardhat
        let expected_hash: B256 =
            "e2fea338f86a021a90028336d380e030030ff98466f13a0367061729232df0ca".parse()?;
        assert_eq!(signed.hash(), &expected_hash);

        Ok(())
    }
}
