const fs = require("fs");

const leituraArquivo = (): unknown => {
  return JSON.parse(fs.readFileSync("./bd.json"));
};

const escreverArquivo = (dados: any): void => {
  fs.writeFileSync("../bd.json", JSON.stringify(dados));
};

type Endereco = {
  cep: string;
  rua: string;
  complemento?: string;
  bairro: string;
  cidade: string;
};

type Usuario = {
  nome: string;
  email: string;
  cpf: string;
  profissao?: string;
  endereco: Endereco | null;
};

const cadastrarUsuario = (dados: Usuario): Usuario => {
  const bd = leituraArquivo() as Usuario[];

  bd.push(dados);
  escreverArquivo(bd);

  return dados;
};

const listarUsuarios = (profissao?: string): Usuario[] => {
  const bd = leituraArquivo() as Usuario[];

  const listar = bd.filter(usuario =>{
    if (profissao){
        return usuario.profissao === profissao
    }
  })

  return listar
};

cadastrarUsuario({
  nome: "Bruno",
  email: "dasdas@hotmail.com",
  cpf: "12345590",
  endereco: {
    cep: "12123-56",
    rua: "Aviador",
    bairro: "Tabua",
    cidade: "Ola",
  },
});

const detalharUsuario = (cpf: string): Usuario => {
  const bd = leituraArquivo() as Usuario[];
  const usuario = bd.find((usuario) => {
    return usuario.cpf === cpf;
  });

  if (!usuario) {
    throw new Error("Usuário não existe.");
  }
  return usuario;
};

const atualizarUsuario = (cpf: string, dados: Usuario) => {
  const bd = leituraArquivo() as Usuario[];
  const usuario = bd.find((usuario) => {
    return usuario.cpf === cpf;
  });

  if (!usuario) {
    throw new Error("Usuário não existe.");
  }

  Object.assign(usuario, dados);

  escreverArquivo(bd);
};

const excluirUsuario = (cpf: string): Usuario => {
  const bd = leituraArquivo() as Usuario[];
  const usuario = bd.find((usuario) => {
    return usuario.cpf === cpf;
  });

  if (!usuario) {
    throw new Error("Usuário não existe.");
  }

  const excluir = bd.filter((usuario) => {
    return usuario.cpf !== cpf;
  });

  escreverArquivo(excluir);

  return usuario;
};

