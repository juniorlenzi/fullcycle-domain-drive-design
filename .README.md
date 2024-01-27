Estou rodando testes com o BUN (testando), o teste abaixo irá dar erro com o node, pois para funcionar com o bun o "reject" precisa ser removido!

-> Versão node
it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find("456ABC")
    }).rejects.toThrow("Customer not found");
});

-> versão BUN - ainda não suporta .reject porém funciona normalmente sem
it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find("456ABC")
    }).toThrow("Customer not found");
});

