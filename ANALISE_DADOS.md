# 📊 Análise de Dados - Checklists Transpaleteira

Guia para processar e analisar os dados exportados dos checklists da transpaleteira elétrica.

## 🐍 Script de Análise Python

Um script Python fornecido permite processar e analisar facilmente todos os checklists exportados.

### Requisitos

```bash
pip install -r requirements.txt
# ou simplesmente Python 3.6+
```

O script não tem dependências externas, apenas Python padrão.

### Instalação

1. Certifique-se de ter Python 3.6+ instalado
2. Copie o arquivo `processar_checklists.py` para sua pasta de trabalho
3. Coloque seus arquivos JSON de checklist na mesma pasta ou em uma subpasta

### Uso

#### 1. Analisar um Checklist Individual

```bash
python processar_checklists.py checklist-transpaleteira-TP-001-2024-07-07.json
```

**Saída**: JSON formatado com todos os dados do checklist

#### 2. Analisar Múltiplos Checklists de uma Pasta

```bash
python processar_checklists.py --pasta ./checklists
```

**Saída**:
- Relatório consolidado no console
- Arquivo `relatorio_checklists_[data_hora].txt` gerado

#### 3. Analisar um Equipamento Específico

```bash
python processar_checklists.py --equipamento TP-001
```

**Saída**: Análise completa do equipamento TP-001

### Exemplos de Saída

#### Relatório Consolidado

```
================================================================================
📊 RELATÓRIO CONSOLIDADO
================================================================================

Total de Checklists: 45
✅ Aprovados: 40 (88.9%)
⚠️  Condicional: 3 (6.7%)
❌ Reprovados: 2 (4.4%)

Equipamentos Inspecionados: 12
Operadores: 8

Manutenção Necessária:
  - nao: 40
  - sim_corretiva: 2
  - sim_preventiva: 3
```

#### Relatório por Equipamento

```
================================================================================
🏗️  RELATÓRIO DE EQUIPAMENTOS
================================================================================

📦 TP-001
   Marca/Modelo: HELI CPD20
   Localização: Armazém A - Estante 5
   Total de Inspeções: 15
   ✅ Aprovadas: 14 (93%)
   ⚠️  Condicional: 1
   ❌ Reprovadas: 0
   🔋 Carga Média Bateria: 87%
   ⚠️  Problemas Detectados:
      - Pequena rachadura detectada na lateral...

📦 TP-002
   Marca/Modelo: JUNGHEINRICH EJU224
   Localização: Armazém B - Cais de Carga
   Total de Inspeções: 12
   ✅ Aprovadas: 10 (83%)
   ⚠️  Condicional: 2
   ❌ Reprovadas: 0
   🔋 Carga Média Bateria: 82%
```

#### Relatório por Operador

```
👤 João Silva
   Total de Inspeções: 10
   ✅ Aprovadas: 9
   ⚠️  Condicional: 1
   ❌ Reprovadas: 0
   Equipamentos: TP-001, TP-003, TP-005

👤 Maria Santos
   Total de Inspeções: 8
   ✅ Aprovadas: 7
   ⚠️  Condicional: 1
   ❌ Reprovadas: 0
   Equipamentos: TP-002, TP-004
```

## 📈 Análise Manual em Planilha

### Excel/Google Sheets

1. **Importe os JSONs**
   - Google Sheets: Use a função `=IMPORTDATA()` ou copie os dados
   - Excel: Use a ferramenta "Get & Transform Data" > "From JSON"

2. **Estruture as colunas**
   ```
   A: equipmentId
   B: equipmentBrand
   C: operatorName
   D: checkDate
   E: conclusion
   F: batteryLevel
   G: maintenanceRequired
   ```

3. **Crie Gráficos**
   - Gráfico de Pizza: Taxa de Aprovação
   - Gráfico de Barras: Checklists por Equipamento
   - Gráfico de Linha: Tendência de Bateria por Data

## 🔍 Análises Úteis

### 1. Taxa de Aprovação por Equipamento

```python
# Quantos % de cada equipamento está aprovado?
for eq_id in equipamentos_unicos:
    checklists_eq = [c for c in checklists if c['equipmentId'] == eq_id]
    aprovados = len([c for c in checklists_eq if c['conclusion'] == 'aprovado'])
    taxa = (aprovados / len(checklists_eq)) * 100
    print(f"{eq_id}: {taxa:.1f}%")
```

### 2. Equipamentos Críticos

```python
# Quais equipamentos tiveram reprovações?
equipamentos_criticos = {}
for c in checklists:
    if c['conclusion'] == 'reprovado':
        eq_id = c['equipmentId']
        if eq_id not in equipamentos_criticos:
            equipamentos_criticos[eq_id] = []
        equipamentos_criticos[eq_id].append(c['observations'])

for eq, problemas in equipamentos_criticos.items():
    print(f"⚠️  {eq}: {len(problemas)} reprovações")
```

### 3. Tendência de Bateria

```python
# A bateria está degradando ao longo do tempo?
import statistics

datas = {}
for c in checklists:
    data = c.get('checkDate')
    bateria = int(c.get('batteryLevel', 0)) if c.get('batteryLevel') else None
    
    if data and bateria:
        if data not in datas:
            datas[data] = []
        datas[data].append(bateria)

for data in sorted(datas.keys()):
    media = statistics.mean(datas[data])
    print(f"{data}: {media:.1f}% (n={len(datas[data])})")
```

### 4. Padrões de Manutenção

```python
# Que tipo de manutenção mais foi necessária?
manutencao_tipo = {}
for c in checklists:
    if c.get('maintenanceRequired') != 'nao':
        tipo = c.get('maintenanceRequired')
        manutencao_tipo[tipo] = manutencao_tipo.get(tipo, 0) + 1

for tipo, count in sorted(manutencao_tipo.items(), key=lambda x: x[1], reverse=True):
    print(f"{tipo}: {count} vezes")
```

## 📊 Integração com BI

### Power BI / Tableau

1. Exporte os JSONs em formato CSV:
```python
import json
import csv

checklists = [json.load(open(f)) for f in arquivos]

with open('checklists.csv', 'w', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=['equipmentId', 'operatorName', 'checkDate', 'conclusion', 'batteryLevel'])
    writer.writeheader()
    for c in checklists:
        writer.writerow(c)
```

2. Importe em seu tool de BI
3. Crie dashboards com insights

### Google Data Studio

1. Crie uma planilha Google com os dados
2. Conecte em Data Studio
3. Crie visualizações e dashboards

## 🎯 KPIs Recomendados

| KPI | Descrição | Meta |
|-----|-----------|------|
| Taxa de Aprovação | % de equipamentos aprovados | ≥95% |
| Tempo Médio Inspeção | Minutos por checklist | <15 min |
| Equipamentos Críticos | Com reprovações | 0 |
| Conformidade de Operadores | Com treinamento válido | 100% |
| Disponibilidade de Bateria | Carga média inicial | ≥85% |
| Tempo para Manutenção | Dias até correção | ≤7 dias |

## 📋 Checklist de Implementação

- [ ] Exportar todos os JSONs regularmente
- [ ] Criar pasta `checklists/` com os dados
- [ ] Rodar script Python mensalmente
- [ ] Revisar relatório consolidado
- [ ] Identificar equipamentos críticos
- [ ] Comunicar problemas à manutenção
- [ ] Acompanhar trends ao longo do tempo
- [ ] Documentar melhorias implementadas

## 🐛 Troubleshooting

### Erro: "JSONDecodeError"
- Verifique se o arquivo JSON é válido
- Use um validador JSON online se necessário

### Erro: "FileNotFoundError"
- Verifique o caminho do arquivo
- Use caminhos absolutos se tiver dúvidas

### Erro: "Nenhum checklist encontrado"
- Verifique se os arquivos estão em `checklist-*.json`
- Certifique-se que estão na pasta correta

## 📞 Suporte

Para dúvidas sobre análise:
1. Verifique a estrutura do JSON (exemplo-checklist.json)
2. Valide seu JSON antes de processar
3. Use `--pasta` para processar vários de uma vez

## 📚 Referências

- Documentação do script: veja `processar_checklists.py`
- Estrutura JSON: veja `exemplo-checklist.json`
- Guia de uso: veja `GUIA_TRANSPALETEIRA.md`

---

**Último atualizado**: 2024-07-07
