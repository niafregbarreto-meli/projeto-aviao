#!/usr/bin/env python3
"""
Script para processar e analisar checklists exportados da aplicação Transpaleteira Elétrica.

Uso:
    python processar_checklists.py <caminho_do_arquivo_json>
    python processar_checklists.py --pasta <caminho_da_pasta>
    python processar_checklists.py --relatorio
"""

import json
import os
import sys
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Any


class ProcessadorChecklist:
    """Classe para processar e analisar dados de checklists."""

    def __init__(self):
        self.checklists = []
        self.estatisticas = {}

    def carregar_json(self, caminho: str) -> Dict[str, Any]:
        """Carrega um arquivo JSON de checklist."""
        try:
            with open(caminho, 'r', encoding='utf-8') as f:
                return json.load(f)
        except (json.JSONDecodeError, FileNotFoundError) as e:
            print(f"❌ Erro ao carregar {caminho}: {e}")
            return None

    def carregar_pasta(self, caminho_pasta: str) -> None:
        """Carrega todos os JSONs de uma pasta."""
        pasta = Path(caminho_pasta)
        if not pasta.exists():
            print(f"❌ Pasta não encontrada: {caminho_pasta}")
            return

        arquivos = list(pasta.glob("checklist-*.json"))
        if not arquivos:
            print(f"❌ Nenhum checklist encontrado em {caminho_pasta}")
            return

        for arquivo in sorted(arquivos):
            checklist = self.carregar_json(str(arquivo))
            if checklist:
                self.checklists.append(checklist)
                print(f"✅ Carregado: {arquivo.name}")

        print(f"\n📊 Total de checklists carregados: {len(self.checklists)}\n")

    def analisar_equipamento(self, equipment_id: str) -> Dict[str, Any]:
        """Analisa dados de um equipamento específico."""
        equipamentos = [c for c in self.checklists if c.get('equipmentId') == equipment_id]

        if not equipamentos:
            return {"erro": f"Nenhum checklist encontrado para {equipment_id}"}

        return {
            "equipmentId": equipment_id,
            "total_inspecoes": len(equipamentos),
            "primeira_inspecao": equipamentos[0].get('checkDate'),
            "ultima_inspecao": equipamentos[-1].get('checkDate'),
            "conclusoes": self._contar_conclusoes(equipamentos),
            "problemas": self._listar_problemas(equipamentos),
            "taxa_aprovacao": f"{(len([e for e in equipamentos if e.get('conclusion') == 'aprovado']) / len(equipamentos) * 100):.1f}%"
        }

    def _contar_conclusoes(self, equipamentos: List[Dict]) -> Dict[str, int]:
        """Conta as conclusões dos checklists."""
        conclusoes = {}
        for eq in equipamentos:
            conclusion = eq.get('conclusion', 'desconhecido')
            conclusoes[conclusion] = conclusoes.get(conclusion, 0) + 1
        return conclusoes

    def _listar_problemas(self, equipamentos: List[Dict]) -> List[str]:
        """Lista problemas encontrados nos checklists."""
        problemas = set()
        for eq in equipamentos:
            obs = eq.get('observations', '').lower()
            if obs:
                for palavra_chave in ['problema', 'defeito', 'danificado', 'rachado', 'vazamento']:
                    if palavra_chave in obs:
                        problemas.add(obs[:100])
        return list(problemas)

    def gerar_relatorio_operadores(self) -> str:
        """Gera relatório por operador."""
        operadores = {}

        for checklist in self.checklists:
            op_name = checklist.get('operatorName', 'Desconhecido')
            if op_name not in operadores:
                operadores[op_name] = {
                    "total": 0,
                    "aprovados": 0,
                    "condicional": 0,
                    "reprovados": 0,
                    "equipamentos": set()
                }

            operadores[op_name]["total"] += 1
            conclusion = checklist.get('conclusion', '')
            if conclusion == 'aprovado':
                operadores[op_name]["aprovados"] += 1
            elif conclusion == 'aprovado_condicional':
                operadores[op_name]["condicional"] += 1
            elif conclusion == 'reprovado':
                operadores[op_name]["reprovados"] += 1

            operadores[op_name]["equipamentos"].add(checklist.get('equipmentId', 'N/A'))

        relatorio = "=" * 80 + "\n"
        relatorio += "📋 RELATÓRIO DE OPERADORES\n"
        relatorio += "=" * 80 + "\n\n"

        for operador, dados in sorted(operadores.items()):
            relatorio += f"👤 {operador}\n"
            relatorio += f"   Total de Inspeções: {dados['total']}\n"
            relatorio += f"   ✅ Aprovadas: {dados['aprovados']}\n"
            relatorio += f"   ⚠️  Condicional: {dados['condicional']}\n"
            relatorio += f"   ❌ Reprovadas: {dados['reprovados']}\n"
            relatorio += f"   Equipamentos: {', '.join(sorted(dados['equipamentos']))}\n"
            relatorio += "\n"

        return relatorio

    def gerar_relatorio_equipamentos(self) -> str:
        """Gera relatório por equipamento."""
        equipamentos = {}

        for checklist in self.checklists:
            eq_id = checklist.get('equipmentId', 'Desconhecido')
            if eq_id not in equipamentos:
                equipamentos[eq_id] = {
                    "marca": checklist.get('equipmentBrand', 'N/A'),
                    "localizacao": checklist.get('equipmentLocation', 'N/A'),
                    "total": 0,
                    "aprovados": 0,
                    "condicional": 0,
                    "reprovados": 0,
                    "bateria_media": [],
                    "problemas": []
                }

            equipamentos[eq_id]["total"] += 1
            conclusion = checklist.get('conclusion', '')
            if conclusion == 'aprovado':
                equipamentos[eq_id]["aprovados"] += 1
            elif conclusion == 'aprovado_condicional':
                equipamentos[eq_id]["condicional"] += 1
            elif conclusion == 'reprovado':
                equipamentos[eq_id]["reprovados"] += 1

            bateria = checklist.get('batteryLevel')
            if bateria:
                try:
                    equipamentos[eq_id]["bateria_media"].append(int(bateria))
                except ValueError:
                    pass

            obs = checklist.get('observations', '')
            if 'problema' in obs.lower() or 'defeito' in obs.lower():
                equipamentos[eq_id]["problemas"].append(obs[:80])

        relatorio = "=" * 80 + "\n"
        relatorio += "🏗️  RELATÓRIO DE EQUIPAMENTOS\n"
        relatorio += "=" * 80 + "\n\n"

        for eq_id, dados in sorted(equipamentos.items()):
            relatorio += f"📦 {eq_id}\n"
            relatorio += f"   Marca/Modelo: {dados['marca']}\n"
            relatorio += f"   Localização: {dados['localizacao']}\n"
            relatorio += f"   Total de Inspeções: {dados['total']}\n"
            relatorio += f"   ✅ Aprovadas: {dados['aprovados']} ({dados['aprovados']/dados['total']*100:.0f}%)\n"
            relatorio += f"   ⚠️  Condicional: {dados['condicional']}\n"
            relatorio += f"   ❌ Reprovadas: {dados['reprovados']}\n"

            if dados['bateria_media']:
                media_bateria = sum(dados['bateria_media']) / len(dados['bateria_media'])
                relatorio += f"   🔋 Carga Média Bateria: {media_bateria:.0f}%\n"

            if dados['problemas']:
                relatorio += f"   ⚠️  Problemas Detectados:\n"
                for problema in dados['problemas']:
                    relatorio += f"      - {problema}...\n"

            relatorio += "\n"

        return relatorio

    def gerar_relatorio_completo(self) -> str:
        """Gera um relatório completo consolidado."""
        total = len(self.checklists)
        aprovados = len([c for c in self.checklists if c.get('conclusion') == 'aprovado'])
        condicional = len([c for c in self.checklists if c.get('conclusion') == 'aprovado_condicional'])
        reprovados = len([c for c in self.checklists if c.get('conclusion') == 'reprovado'])

        relatorio = "\n" + "=" * 80 + "\n"
        relatorio += "📊 RELATÓRIO CONSOLIDADO\n"
        relatorio += "=" * 80 + "\n\n"
        relatorio += f"Total de Checklists: {total}\n"
        relatorio += f"✅ Aprovados: {aprovados} ({aprovados/total*100:.1f}%)\n"
        relatorio += f"⚠️  Condicional: {condicional} ({condicional/total*100:.1f}%)\n"
        relatorio += f"❌ Reprovados: {reprovados} ({reprovados/total*100:.1f}%)\n\n"

        # Equipamentos únicos
        equipamentos_unicos = set(c.get('equipmentId') for c in self.checklists)
        relatorio += f"Equipamentos Inspecionados: {len(equipamentos_unicos)}\n"
        relatorio += f"Operadores: {len(set(c.get('operatorName') for c in self.checklists))}\n\n"

        # Manutenção necessária
        manutencao = {}
        for c in self.checklists:
            m = c.get('maintenanceRequired', 'nao')
            manutencao[m] = manutencao.get(m, 0) + 1

        relatorio += "Manutenção Necessária:\n"
        for tipo, count in sorted(manutencao.items()):
            relatorio += f"  - {tipo}: {count}\n"

        relatorio += "\n" + self.gerar_relatorio_equipamentos()
        relatorio += self.gerar_relatorio_operadores()

        return relatorio

    def exportar_relatorio(self, caminho_saida: str) -> None:
        """Exporta o relatório para um arquivo."""
        relatorio = self.gerar_relatorio_completo()
        with open(caminho_saida, 'w', encoding='utf-8') as f:
            f.write(relatorio)
        print(f"✅ Relatório exportado para: {caminho_saida}")


def main():
    """Função principal."""
    if len(sys.argv) < 2:
        print("Uso:")
        print("  python processar_checklists.py <arquivo.json>")
        print("  python processar_checklists.py --pasta <caminho>")
        print("  python processar_checklists.py --equipamento <ID>")
        return

    processador = ProcessadorChecklist()

    if sys.argv[1] == '--pasta' and len(sys.argv) > 2:
        processador.carregar_pasta(sys.argv[2])
        relatorio = processador.gerar_relatorio_completo()
        print(relatorio)

        # Salvar relatório
        nome_arquivo = f"relatorio_checklists_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
        processador.exportar_relatorio(nome_arquivo)

    elif sys.argv[1] == '--equipamento' and len(sys.argv) > 2:
        # Carregar de pasta atual se existir
        if os.path.exists('checklists'):
            processador.carregar_pasta('checklists')

        eq_id = sys.argv[2]
        analise = processador.analisar_equipamento(eq_id)
        print(json.dumps(analise, indent=2, ensure_ascii=False))

    else:
        # Carregar arquivo único
        checklist = processador.carregar_json(sys.argv[1])
        if checklist:
            print(json.dumps(checklist, indent=2, ensure_ascii=False))


if __name__ == '__main__':
    main()
