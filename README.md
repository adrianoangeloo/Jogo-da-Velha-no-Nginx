# Jogo da Velha no Nginx

Jogo da Velha em HTML, CSS e JavaScript, servido por Nginx no Linux Ubuntu (VirtualBox) e acessado pelo navegador do computador.

## Tecnologias

HTML, CSS, JavaScript, Nginx, Ubuntu Linux e VirtualBox.

## Arquivos

index.html: estrutura da pagina e do tabuleiro
style.css: visual do jogo
script.js: logica do jogo (vez, vitoria e empate)
docs/jogo.gif: gif do jogo rodando

## Como rodar

### 1. Instalar o Nginx

```
sudo apt update
sudo apt install nginx -y
```

### 2. Criar a pasta do site e copiar os arquivos

```
sudo mkdir -p /var/www/jogo-da-velha
sudo cp index.html style.css script.js /var/www/jogo-da-velha/
```

### 3. Criar a configuracao do site

```
sudo nano /etc/nginx/sites-available/jogo-da-velha
```

Conteudo do arquivo:

```
server {
    listen 80;
    server_name _;

    root /var/www/jogo-da-velha;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

### 4. Ativar o site

```
sudo ln -s /etc/nginx/sites-available/jogo-da-velha /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
```

### 5. Testar a configuracao e reiniciar o Nginx

```
sudo nginx -t
sudo systemctl restart nginx
```

### 6. Abrir no navegador da VM

Acesse:

```
http://localhost
```

### 6.1. Abrir no navegador do seu computador (fora da VM)

No VirtualBox, com a VM selecionada:

1. Va em Configuracoes, Rede, Adaptador 1.
2. Abra Avancado e clique em Redirecionamento de Portas.
3. Clique no botao de adicionar e preencha:
   - Protocolo: TCP
   - IP do Hospedeiro: 127.0.0.1
   - Porta do Hospedeiro: 8080
   - IP do Convidado: deixe vazio
   - Porta do Convidado: 80
4. Clique em OK.

Depois, no navegador do seu computador, acesse:

```
http://localhost:8080
```

## Erros que enfrentei

| Erro | Causa | Solucao |
| --- | --- | --- |
| mkdir: Permission denied | /var/www pertence ao root | usar sudo |
| No such file or directory | faltou a barra no comeco do caminho | usar o caminho completo, comecando com / |
| directive "root" is not terminated by ";" | faltou o ponto e virgula no fim da linha | adicionar o ; |
| Firefox nao conectava com o Nginx rodando | cache da pagina de erro | recarregar com Ctrl+Shift+R |

## Creditos

Feito por Adriano, com ajuda do Claude (IA da Anthropic).
