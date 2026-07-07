# 📤 Guia de Upload para Grid AdminML

## Problemas Conhecidos e Soluções

Se você está vendo "invalid_file" ao fazer upload, aqui estão as soluções:

## ✅ Solução Recomendada

### Opção 1: Usar a Versão Otimizada (Recomendado)

1. Use o arquivo: **`checklist-transpaleteira-grid.html`**
   - Versão otimizada específica para Grid AdminML
   - Menor tamanho
   - Maior compatibilidade

2. Passos no Grid:
   - Clique em "New File" ou "Upload"
   - Escolha o arquivo: `checklist-transpaleteira-grid.html`
   - No título: `CHECKLIST TRANSPALETEIRA`
   - Permissões: Selecione quem pode acessar
   - Clique em "Upload"

### Opção 2: Criar um ZIP

Se o HTML ainda não funcionar, tente com um ZIP:

```bash
zip checklist-transpaleteira.zip checklist-transpaleteira-grid.html
```

Depois faça upload do `.zip` em vez do `.html`

## 🔍 Se Continuar Dando Erro

### Verificação de Compatibilidade

1. **Verifique o navegador**
   - Use Chrome ou Firefox mais recentes
   - Limpe o cache: Ctrl+Shift+Delete

2. **Verifique o arquivo**
   - Certifique-se de que o arquivo tem a extensão `.html`
   - Não tente fazer upload com nome especial ou caracteres especiais
   - Renomeie se necessário: `checklist.html`

3. **Tamanho do arquivo**
   - O arquivo deve ter menos de 5MB (verificar: ~650KB)
   - Se tiver anexos, comprima em ZIP

## 📝 Alternativa: Criar Manualmente no Grid

Se o upload automático não funcionar:

1. Abra o Grid AdminML
2. Clique em "New File" > "HTML"
3. Cole o conteúdo do arquivo `checklist-transpaleteira-grid.html`
4. Salve com o nome: `Checklist Transpaleteira`

## 🔗 Links Úteis

- Grid AdminML: https://grid.adminml.com/my
- Documentação: Ver `GUIA_TRANSPALETEIRA.md`
- Exemplos: Ver `exemplo-checklist.json`

## 💾 Após Upload Bem-Sucedido

1. **Acesse a aplicação**
   - Copie o link fornecido pelo Grid
   - Compartilhe com os operadores

2. **Use a aplicação**
   - Preencha os dados do equipamento
   - Faça as inspeções
   - Exporte os JSONs

3. **Processe os dados**
   - Use `processar_checklists.py`
   - Gere relatórios
   - Analise tendências

## 🚀 Próximos Passos

Após upload bem-sucedido:

```bash
# 1. Operadores fazem checklists e exportam JSONs
# 2. Crie uma pasta com os JSONs
mkdir checklists
mv *.json checklists/

# 3. Processe os dados
python processar_checklists.py --pasta ./checklists

# 4. Revise o relatório gerado
cat relatorio_checklists_*.txt
```

## 📞 Troubleshooting

| Erro | Solução |
|------|---------|
| "invalid_file" | Use `checklist-transpaleteira-grid.html` |
| "File too large" | Comprima em ZIP |
| "Caracteres inválidos" | Renomeie sem acentos |
| "Permissão negada" | Verifique permissões da conta |
| "Upload incompleto" | Tente novamente ou use ZIP |

## 📱 Teste em Mobile

Após upload, teste em mobile:
- iPhone/iPad: Safari
- Android: Chrome

A aplicação é responsiva e funciona perfeitamente em mobile!

## ✅ Checklist de Implementação

- [ ] Faça download de `checklist-transpaleteira-grid.html`
- [ ] Acesse https://grid.adminml.com/my
- [ ] Clique "New File" ou "Upload"
- [ ] Selecione o arquivo `checklist-transpaleteira-grid.html`
- [ ] Defina titulo: "CHECKLIST TRANSPALETEIRA"
- [ ] Configure permissões
- [ ] Clique "Upload"
- [ ] Teste o link gerado
- [ ] Compartilhe com os operadores

## 🎯 Validação Final

Após upload, valide:
- ✅ Formulário abre corretamente
- ✅ Campos de entrada funcionam
- ✅ Checkboxes marcam/desmarcam
- ✅ Barra de progresso atualiza
- ✅ Botão "Salvar" funciona
- ✅ Botão "Exportar JSON" funciona
- ✅ Funciona em mobile

## 📚 Documentação Adicional

- **GUIA_TRANSPALETEIRA.md** - Guia completo de uso
- **README_TRANSPALETEIRA.md** - Documentação técnica
- **ANALISE_DADOS.md** - Como processar dados exportados
- **processar_checklists.py** - Script para análise

---

**Última atualização**: 2024-07-07  
**Status**: Testado e funcional
