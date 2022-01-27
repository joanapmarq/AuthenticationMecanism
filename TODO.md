# para fazer
garantir que há variação na sequência

para garantir que há variação na sequencia é preciso antes de adicionar a sequencia verificar 
se já existe alguma igual 

Para isso tenho que gerar e encriptala - verificar - se houver gera outra se nao houver -- adiciona



OQUE PODE ACONTECER 

UTILIZADOR TER A MESMA COR DO CARTÃO --- > TER A MESMA PASSE 
ENTAO COMO IDENTIFICO QUE É ELE E NAO OUTRO ? COM O SECRET TOKEN 


A SEQUENCIA PRECISA NECESSARIAMENTE DE SER UNICA ? 

PROBLEMA SE SIM --- ENTAO HÁ UM NUMERO DE COMBINAÇÕES FINITO --- VAI TER DE HAVER 
PORQUE SE A AUTENTICAÇÃO TEM QUE SER FEITA PELO CARTAO E PODE HAVER USERS COM AS MESMAS CORES 
ENTAO QUER DIZER QUE A PASSWORD TEM QUE SER UNICA POIS SO O CARTAO E A SEQUENCIA PODEM AUTENTICAR O USER --- OBJETIVO DO TRABALHO 



## POR RESOLVER (23/11/2021)

- quando não encontra um user associado á sequencia apresentada -- > informar o utilizador [x]
- mostrar ao utilzador o temporizador de 4 seg em 4 seg (que guarda a variavél(label) que está a ler) --> boa opação mostrar um género de um flash como se tivesse a tirar uma fotografia [x]
- cronômetro dos 10 seg mais interativo [x]
- Home page com descrição do sistema []
- criar mais cartões com cartolina []
- definir tamanho do cartão [x]
- melhorar pdf --> explicar ao utilizador a sequência []
- melhorar conjunto de imagens --> criar um conjunto de dados maior e conseguir 
distinguir melhor o Vertical do Horizontal , bem como as cores com diferentes 
iluminações []
- inverter posição da camêra -> Espelho [x]
- encriptar cores [x] -- > não faz sentido pois um cartão não é único 
- aumentar passos de sequência [x]









# Relatório - capítulos e subcapítulos


 - Descrição da proposta 
    - o desejado

 - Base de dados

 - Tecnologias utilizadas 
    - Node.js
    - Teachable Machine
    - p5*js


- Implementação





# Capítulo 1 - Introdução 

 1.1 Enquadramento 

 1.2 Objetivos 

 1.3 Organização do Documento

# Capítulo 2 - Estado da Arte 

    - ideias de como fazer 
    - pesquisas feitas 
    - estudo das tecnologias que o prof mandou 
    - e como poderia elaborar a ideia 


# Capítulo 3 - Engenharia de Software 

 - Casos de Uso 
 - Requisitos 
 - Tecnologias Utilizadas 


# Capítulo 4 - Implementação e Testes 

 - Ferramentas utilizadas (p5*js...)
 - Ficheiros mais importantes do projeto 
    - sketch.js - ligação com teachable , recolha da label referente ao reconhecimento de imagem, temporizador de 10 seg , temporizador de 4seg para guardar a label. 

    - controllers - auth.js - ligação com a base de dados, onde é realizado o registo, verificação do mesmo, login , onde se gera as passwords random (etc)

- Testes 

    - problemas de segurança ... 
    - erros no reconhecimento de imagem 

# Capítulo  - Conclusões e Trabalho futuro 

    - Conclusões principais
    - Trabalho Futuro


# Papers 

- Teachable machine - https://dl.acm.org/doi/pdf/10.1145/3334480.3382839 - FEITO 
- Tensorflow.js - https://arxiv.org/pdf/1901.05350.pdf
- ml5.js - https://itp.nyu.edu/adjacent/issue-3/ml5-friendly-open-source-machine-learning-library-for-the-web/ 
- MobileNet - https://arxiv.org/pdf/1704.04861.pdf  