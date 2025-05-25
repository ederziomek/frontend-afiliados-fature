"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Image, Video, FileText, FileType, Search, Filter } from 'lucide-react'; // Added Search, Filter

// --- Expanded Data with Categories/Tags ---
const materials = [
  {
    id: 'banner1',
    icon: Image,
    title: 'Banner Promocional - Esportes',
    description: 'Banner chamativo para divulgar apostas esportivas.',
    downloadLink: '/path/to/banner_esportes.zip',
    type: 'Imagem',
    theme: 'Esportes',
    format: 'JPG/PNG',
    tags: ['banner', 'esportes', 'promoção', 'redes sociais']
  },
  {
    id: 'video1',
    icon: Video,
    title: 'Vídeo Explicativo - Cadastro',
    description: 'Tutorial rápido mostrando como se cadastrar na plataforma.',
    downloadLink: '/path/to/video_cadastro.mp4',
    type: 'Vídeo',
    theme: 'Tutorial',
    format: 'MP4',
    tags: ['vídeo', 'cadastro', 'tutorial', 'explicativo']
  },
  {
    id: 'text1',
    icon: FileText,
    title: 'Texto para WhatsApp - Boas Vindas',
    description: 'Mensagem de boas-vindas para novos indicados.',
    downloadLink: '/path/to/texto_whatsapp.txt',
    type: 'Texto',
    theme: 'Comunicação',
    format: 'TXT',
    tags: ['texto', 'whatsapp', 'boas-vindas', 'mensagem']
  },
  {
    id: 'guide1',
    icon: FileType,
    title: 'Guia Completo Afiliado',
    description: 'Guia PDF com todas as regras e dicas do programa.',
    downloadLink: '/path/to/guia_afiliado.pdf',
    type: 'Documento',
    theme: 'Geral',
    format: 'PDF',
    tags: ['guia', 'pdf', 'regras', 'dicas', 'afiliado']
  },
  {
    id: 'banner2',
    icon: Image,
    title: 'Banner Story - Cassino',
    description: 'Banner vertical otimizado para stories sobre jogos de cassino.',
    downloadLink: '/path/to/banner_cassino_story.zip',
    type: 'Imagem',
    theme: 'Cassino',
    format: 'JPG/PNG',
    tags: ['banner', 'story', 'cassino', 'redes sociais', 'vertical']
  },
  {
    id: 'video2',
    icon: Video,
    title: 'Vídeo Curto - Promoção Bônus',
    description: 'Vídeo rápido para Reels/TikTok sobre bônus de depósito.',
    downloadLink: '/path/to/video_bonus.mp4',
    type: 'Vídeo',
    theme: 'Promoção',
    format: 'MP4',
    tags: ['vídeo', 'reels', 'tiktok', 'bônus', 'promoção']
  },
];

// --- Get unique filter options from data ---
const uniqueTypes = Array.from(new Set(materials.map(m => m.type)));
const uniqueThemes = Array.from(new Set(materials.map(m => m.theme)));
const uniqueFormats = Array.from(new Set(materials.map(m => m.format)));

const MateriaisProntos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterTheme, setFilterTheme] = useState('all');
  const [filterFormat, setFilterFormat] = useState('all');

  const filteredMaterials = materials.filter(material => {
    const typeMatch = filterType === 'all' || material.type === filterType;
    const themeMatch = filterTheme === 'all' || material.theme === filterTheme;
    const formatMatch = filterFormat === 'all' || material.format === filterFormat;
    const searchMatch = searchTerm === '' ||
                        material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return typeMatch && themeMatch && formatMatch && searchMatch;
  });

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <FileType size={20} className="mr-2 text-primary" />
          Materiais Prontos
        </CardTitle>
        <CardDescription className="text-text-secondary">Recursos para ajudar na sua divulgação. Filtre ou busque pelo material desejado.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* --- Filters and Search --- */}
        <div className="mb-6 p-4 bg-background rounded-lg border border-border flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full md:w-auto">
            <Input
              type="search"
              placeholder="Buscar por título, descrição ou tag..."
              className="pl-8 h-9 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={16} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          </div>
          <div className="flex flex-wrap gap-2 items-center justify-center md:justify-end">
            <Filter size={16} className="text-text-secondary hidden md:block"/>
            {/* Type Filter */}
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-auto h-9 text-xs bg-border border-border text-white focus:ring-primary">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border text-white">
                <SelectItem value="all" className="hover:bg-border focus:bg-border">Todos Tipos</SelectItem>
                {uniqueTypes.map(type => (
                  <SelectItem key={type} value={type} className="hover:bg-border focus:bg-border">{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Theme Filter */}
            <Select value={filterTheme} onValueChange={setFilterTheme}>
              <SelectTrigger className="w-auto h-9 text-xs bg-border border-border text-white focus:ring-primary">
                <SelectValue placeholder="Tema" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border text-white">
                <SelectItem value="all" className="hover:bg-border focus:bg-border">Todos Temas</SelectItem>
                {uniqueThemes.map(theme => (
                  <SelectItem key={theme} value={theme} className="hover:bg-border focus:bg-border">{theme}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Format Filter */}
            <Select value={filterFormat} onValueChange={setFilterFormat}>
              <SelectTrigger className="w-auto h-9 text-xs bg-border border-border text-white focus:ring-primary">
                <SelectValue placeholder="Formato" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border text-white">
                <SelectItem value="all" className="hover:bg-border focus:bg-border">Todos Formatos</SelectItem>
                {uniqueFormats.map(format => (
                  <SelectItem key={format} value={format} className="hover:bg-border focus:bg-border">{format}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {/* --- End Filters and Search --- */}

        {/* --- Materials Grid --- */}
        {filteredMaterials.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMaterials.map((material) => (
              <Card key={material.id} className="bg-background border-border flex flex-col">
                <CardHeader className="flex-row items-center space-x-3 pb-3">
                  <material.icon size={24} className="text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0"> {/* Added min-w-0 for text overflow */}
                    <CardTitle className="text-base font-semibold text-white truncate" title={material.title}>{material.title}</CardTitle>
                    <div className="text-xs text-text-secondary flex items-center gap-1 mt-1">
                      <span>{material.type}</span>
                      <span>•</span>
                      <span>{material.theme}</span>
                      <span>•</span>
                      <span>{material.format}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-text-secondary mb-4 line-clamp-2">{material.description}</p>
                </CardContent>
                <div className="p-4 pt-0 mt-auto">
                  <Button asChild variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    <a href={material.downloadLink} download target="_blank" rel="noopener noreferrer">
                      <Download size={16} className="mr-2" />
                      BAIXAR
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-text-secondary py-8">Nenhum material encontrado para os filtros selecionados.</p>
        )}
        {/* --- End Materials Grid --- */}
      </CardContent>
    </Card>
  );
};

export default MateriaisProntos;

