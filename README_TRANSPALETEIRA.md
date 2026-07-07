# 🏗️ Checklist Transpaleteira Elétrica

Uma aplicação web completa para inspeção de segurança e operacionalidade de transpaleteiras elétricas (pallet jacks).

## 📦 Arquivos da Aplicação

- **`transpaleteira-checklist.html`** - Aplicação web completa (arquivo principal)
- **`GUIA_TRANSPALETEIRA.md`** - Guia detalhado de uso e integração
- **`exemplo-checklist.json`** - Exemplo de dados exportados
- **`README_TRANSPALETEIRA.md`** - Este arquivo

## 🚀 Como Usar

### Opção 1: Abrir Localmente
1. Faça download do arquivo `transpaleteira-checklist.html`
2. Clique duas vezes para abrir no navegador
3. Preencha o formulário
4. Exporte ou salve os dados

### Opção 2: Publicar no Grid AdminML
1. Acesse https://grid.adminml.com/my
2. Faça upload do arquivo `transpaleteira-checklist.html`
3. Configure as permissões
4. Compartilhe o link com os operadores

### Opção 3: Integração com Servidor
Copie o arquivo para seu servidor web e acesse via URL.

## ✨ Funcionalidades Principais

### 📋 Checklist Completo
- **Identificação do Equipamento**: ID, marca, localização
- **Dados do Operador**: Nome, matrícula, certificação
- **Inspeções Visuais**: 14 itens (máquina desligada)
- **Inspeções Funcionais**: 11 itens (motor ligado)
- **Observações**: Campo para detalhes adicionais

### 🔍 Áreas de Inspeção

#### Inspeções Visuais (Máquina Desligada)
1. Documentação e EPIs (4 itens)
2. Estrutura e Garfos (4 itens)
3. Rodas e Rolamentos (3 itens)
4. Sistema Hidráulico (3 itens)

#### Inspeções Funcionais (Motor Ligado)
1. Bateria e Conectores (3 itens + nível %)
2. Controles e Segurança (4 itens)
3. Testes de Elevação (4 itens)

### 📊 Recursos Especiais
- **Barra de Progresso**: Visualização em tempo real
- **Contador de Itens**: Verifica quantos itens foram preenchidos
- **Exportação JSON**: Baixar dados estruturados
- **Armazenamento Local**: Salva no navegador (localStorage)
- **Design Responsivo**: Funciona em desktop e mobile

## 📱 Compatibilidade

| Navegador | Suporte |
|-----------|---------|
| Chrome/Chromium | ✅ Total |
| Firefox | ✅ Total |
| Safari | ✅ Total |
| Edge | ✅ Total |
| Mobile Safari (iOS) | ✅ Total |
| Chrome Mobile | ✅ Total |

## 🎨 Interface

A aplicação segue o design system do Mercado Livre:
- Cores: Amarelo (#fff159), Azul (#3483fa), Verde (#00a650)
- Font: Proxima Nova
- Layout: Responsivo e acessível
- Theme: Claro (light mode)

## 📤 Exportação de Dados

### Formato JSON
Os dados exportados contêm:
```json
{
  "equipmentId": "TP-001",
  "operatorName": "João Silva",
  "checkDate": "2024-07-07",
  "checkTime": "09:30",
  "visualInspections": [...],
  "functionalInspections": [...],
  "batteryLevel": "92",
  "conclusion": "aprovado",
  "timestamp": "2024-07-07T09:35:00.000Z"
}
```

### Nome do Arquivo
`checklist-transpaleteira-[ID]-[DATA].json`

Exemplo: `checklist-transpaleteira-TP-001-2024-07-07.json`

## 💾 Armazenamento

### LocalStorage (Navegador)
- Histórico de checklists anteriores
- Persiste entre sessões
- Não requer servidor

### Exportação (Recomendado)
- Salve os JSONs regularmente
- Use para backup e análise
- Integrate com sistemas de gestão

## 🔒 Segurança

- ✅ Dados salvos localmente (sem envio automático)
- ✅ Sem armazenamento em servidor por padrão
- ✅ Você controla quando exportar
- ✅ HTTPS recomendado para grid.adminml.com
- ⚠️ Recomenda-se backup regular dos JSONs

## 📋 Campos Obrigatórios

Para salvar o checklist, preencha obrigatoriamente:
1. **ID do Equipamento**
2. **Nome do Operador**
3. **Conclusão da Inspeção** (aprovado/condicional/reprovado)

## 🎯 Casos de Uso

### 1. Inspeção Diária
- Verifique antes de iniciar o turno
- Registre problemas encontrados
- Comunique à manutenção se necessário

### 2. Manutenção Preventiva
- Use como checklist de verificação
- Valide consertos realizados
- Documente condições finais

### 3. Auditoria de Segurança
- Exporte histórico de checklists
- Analise padrões de problemas
- Implemente melhorias

### 4. Treinamento Operacional
- Use com novos operadores
- Reforce itens críticos de segurança
- Valide compreensão

## 📊 Análise de Dados

Os JSONs exportados podem ser:
- Importados em planilhas (Excel, Google Sheets)
- Integrados com sistemas de BI
- Usados em relatórios de conformidade
- Arquivados para histórico

Exemplo de análise:
```python
import json

with open('checklist-transpaleteira-TP-001-2024-07-07.json') as f:
    data = json.load(f)

total_items = len(data['visualInspections']) + len(data['functionalInspections'])
print(f"Total de itens verificados: {total_items}")
print(f"Conclusão: {data['conclusion']}")
```

## 🔧 Requisitos Técnicos

- Navegador moderno com suporte a:
  - HTML5
  - CSS3
  - JavaScript ES6+
  - LocalStorage API
  - Blob/FormData (para exportação)

Nenhum servidor ou framework especial é necessário.

## 🚀 Deployment

### Docker (Opcional)
```dockerfile
FROM nginx:alpine
COPY transpaleteira-checklist.html /usr/share/nginx/html/index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### GitHub Pages
1. Fork o repositório
2. Ative GitHub Pages nas configurações
3. A aplicação estará em: `https://seu-usuario.github.io/projeto-aviao/transpaleteira-checklist.html`

## 📈 Melhorias Futuras

Possibilidades para versões futuras:
- [ ] Sincronização com banco de dados central
- [ ] Assinatura digital do operador
- [ ] Fotos/evidências do equipamento
- [ ] Integração com sistema de manutenção
- [ ] Relatórios automáticos
- [ ] Alertas e notificações
- [ ] Análise preditiva de falhas
- [ ] App mobile nativa

## 🤝 Contribuições

Para melhorias ou correções:
1. Abra uma issue descrevendo a sugestão
2. Faça um fork e crie uma branch
3. Envie um pull request

## 📞 Suporte

Em caso de dúvidas:
1. Consulte o `GUIA_TRANSPALETEIRA.md`
2. Verifique o `exemplo-checklist.json`
3. Verifique a compatibilidade do navegador
4. Limpe o cache e tente novamente

## 📄 Licença

Esta aplicação é fornecida como está para fins de segurança operacional.

## 📝 Notas de Versão

### v1.0 (2024-07-07)
- ✅ Versão inicial
- ✅ Todos os itens de checklist implementados
- ✅ Exportação JSON
- ✅ LocalStorage support
- ✅ Design responsivo
- ✅ Documentação completa

## 🎓 Referências de Segurança

Baseado em melhores práticas:
- ABNT NBR ISO 3691-4 (Equipamentos de movimentação)
- NR 12 (Segurança em máquinas)
- Normas de segurança do Mercado Livre
- Procedimentos padrão da indústria

---

**Desenvolvido com ❤️ para segurança operacional**

Para mais informações, consulte o `GUIA_TRANSPALETEIRA.md`
