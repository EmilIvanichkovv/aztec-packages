
// This circuit aggregates a single Honk proof from `assert_statement_recursive`.
global SIZE_OF_PROOF_IF_LOGN_IS_28 : u32 = 409;
fn main(
    verification_key: [Field; 120],
    // This is the proof without public inputs attached.
    // 
    // This means: the size of this does not change with the number of public inputs.
    proof: [Field; SIZE_OF_PROOF_IF_LOGN_IS_28],
    public_inputs: pub [Field; 1],
    // This is currently not public. It is fine given that the vk is a part of the circuit definition.
    // I believe we want to eventually make it public too though.
    key_hash: Field
    // WORKTODO: Can we delete this program? noir needed it for some reason but its not used in bberg
) {
    std::verify_proof(
        verification_key,
        proof,
        public_inputs,
        key_hash
    );
}
