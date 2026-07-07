# 📋 Checklist Transpaleteira Elétrica - Guia de Uso

## Visão Geral

Esta aplicação web oferece um checklist completo para inspeção de segurança e operacionalidade de transpaleteiras elétricas. É um instrumento essencial para garantir a segurança do operador e prevenir paradas não programadas.

## Como Acessar

1. Abra o arquivo `transpaleteira-checklist.html` em um navegador web
2. Ou acesse a URL: `https://grid.adminml.com/my` (após upload)

## Estrutura do Checklist

### 1️⃣ Identificação do Equipamento
Preencha os dados do equipamento:
- **ID/Número**: Identificador único da máquina (ex: TP-001)
- **Marca/Modelo**: Fabricante e modelo específico
- **Localização/Setor**: Onde a máquina está alocada

### 2️⃣ Dados do Operador
Registre as informações do operador responsável:
- **Nome do Operador**: Nome completo
- **ID/Matrícula**: Identificação funcional
- **Data e Hora**: Registra automaticamente, mas pode ser ajustado
- **Treinamento**: Validação se o operador possui certificação válida

### 3️⃣ Inspeções Visuais (Máquina Desligada)
Realizada com a transpaleteira **desligada**:

#### Documentação e EPIs
- ✅ Botina de segurança
- ✅ Luvas de proteção
- ✅ Colete ou camiseta apropriada
- ✅ Manual do equipamento disponível

#### Estrutura e Garfos
- ✅ Garfos sem amassados ou deformações
- ✅ Sem rachaduras na estrutura
- ✅ Desgaste dentro dos limites aceitáveis
- ✅ Pintura íntegra (sem corrosão)

#### Rodas e Rolamentos
- ✅ Rodas em bom estado (sem gastos ou rachaduras)
- ✅ Rodas giram livremente sem travamentos
- ✅ Alinhamento correto

#### Sistema Hidráulico
- ✅ Sem vazamentos de óleo/fluido
- ✅ Nível de fluido hidráulico adequado
- ✅ Mangueiras hidráulicas íntegras

### 4️⃣ Inspeções Funcionais (Motor Ligado)
Realizada com a transpaleteira **ligada**:

#### Bateria (Modelos Elétricos)
- ✅ Nível de carga adequado (≥80%)
- ✅ Cabos e conectores em bom estado
- ✅ Trava de segurança da bateria firme
- 📊 Registre o percentual exato de carga

#### Controles e Segurança
- ✅ Buzina/Alerta sonoro funciona
- ✅ Freio funciona adequadamente
- ✅ Botão de reversão/antiesmagamento funciona
- ✅ Timão/Controle de direção responsivo

#### Testes de Elevação
- ✅ Elevação sobe suavemente
- ✅ Descida é controlada e uniforme
- ✅ Equipamento para corretamente no topo
- ✅ Carga permanece estável durante elevação

### 5️⃣ Observações e Notas
- Descreva qualquer problema encontrado
- Recomende manutenção necessária
- Indique se é preventiva ou corretiva urgente

### 6️⃣ Conclusão da Inspeção
Selecione o status final:
- **✅ Equipamento Aprovado**: Pronto para operação
- **⚠️ Aprovado com Condicionantes**: Aprovado com restrições
- **❌ Equipamento Reprovado**: Não está apto

## Funcionalidades

### Barra de Progresso
Acompanha automaticamente quantos itens foram verificados versus o total:
- Atualiza em tempo real conforme você marca as caixas
- Ajuda a garantir que nenhum item foi esquecido

### Exportar JSON
Baixa um arquivo JSON com todos os dados do checklist:
- Nome do arquivo: `checklist-transpaleteira-[ID]-[DATA].json`
- Pode ser integrado com sistemas de gestão
- Inclui todos os dados preenchidos e timestamp

### Salvar Localmente
Os dados são salvos automaticamente no navegador:
- Usa o localStorage do navegador
- Funciona mesmo offline
- Histórico de checklists anteriores é preservado

### Design Responsivo
- Otimizado para desktop e mobile
- Interface clara e intuitiva
- Compatível com cores do Mercado Livre

## Dicas de Uso

### ✅ Melhoores Práticas
1. Realize as inspeções visuais primeiro (máquina desligada)
2. Depois realize as funcionais (máquina ligada)
3. Se encontrar problemas, descreva detalhadamente nas observações
4. Sempre conclua a inspeção com um status final
5. Exporte o JSON para manter registros

### 🚫 Situações que Reprovam
- Falta de EPIs ou treinamento vencido
- Rachaduras, deformações ou desgaste excessivo
- Vazamentos de fluido hidráulico
- Freio ou controles não funcionam
- Bateria com carga baixa (<80%)

### 📋 Registros
- Mantenha cópias do JSON exportado
- Use para auditorias de segurança
- Documente manutenções realizadas
- Crie histórico por equipamento

## Integração com Grid AdminML

Para usar no grid.adminml.com/my:

1. Faça upload do arquivo `transpaleteira-checklist.html`
2. Configure as permissões de acesso
3. Compartilhe o link com os operadores
4. Collect os JSONs exportados para análise

## Campos Obrigatórios

Para salvar o checklist, você DEVE preencher:
- **ID do Equipamento** 
- **Nome do Operador**
- **Conclusão da Inspeção**

## Compatibilidade

- ✅ Chrome/Chromium (recomendado)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## Suporte Técnico

Em caso de dúvidas ou problemas:
1. Verifique se o navegador está atualizado
2. Limpe o cache do navegador se houver problemas
3. Use o botão "Limpar Formulário" para começar novo
4. Exporte em JSON para recuperar dados

## Segurança

- Os dados são salvos localmente no seu navegador
- Nenhum dado é enviado automaticamente a servidores
- Você controla quando exportar e compartilhar
- Recomenda-se exportar regularmente para backup

## Atualizações Futuras

Possíveis melhorias planejadas:
- Integração com banco de dados central
- Gráficos e relatórios de histórico
- Alertas automáticos para manutenção
- Assinatura digital do operador
- Envio automático para sistema de gestão

---

**Versão**: 1.0  
**Data de Criação**: 2024  
**Idioma**: Português Brasileiro  
**Status**: Produção
