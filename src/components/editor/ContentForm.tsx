
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { ProjectWork } from '@/types/project';
import { convertFigmaUrlToIframe } from '@/utils/figmaUtils';

interface ContentFormProps {
  project: Partial<ProjectWork>;
  figmaUrl: string;
  embedCodeInput: string;
  iframeList: string[];
  onFigmaUrlChange: (value: string) => void;
  onEmbedCodeChange: (value: string) => void;
  onIframeListUpdate: (iframes: string[]) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ContentForm: React.FC<ContentFormProps> = ({
  project,
  figmaUrl,
  embedCodeInput,
  iframeList,
  onFigmaUrlChange,
  onEmbedCodeChange,
  onIframeListUpdate,
  onChange
}) => {
  const handleAddFigmaUrl = () => {
    if (!figmaUrl.trim()) return;
    
    const convertedIframe = convertFigmaUrlToIframe(figmaUrl.trim());
    const newIframeList = [...iframeList, convertedIframe];
    
    onIframeListUpdate(newIframeList);
    onEmbedCodeChange(newIframeList.join('\n\n'));
    onFigmaUrlChange('');
    
    toast({
      title: "Success",
      description: "Figma prototype added successfully."
    });
  };

  const handleRemoveIframe = (index: number) => {
    const newIframeList = iframeList.filter((_, i) => i !== index);
    onIframeListUpdate(newIframeList);
    onEmbedCodeChange(newIframeList.join('\n\n'));
  };

  const handleEmbedCodeTextareaChange = (value: string) => {
    onEmbedCodeChange(value);
    const iframes = value.split('\n\n').map(item => item.trim()).filter(item => item);
    onIframeListUpdate(iframes);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project Content (Japanese)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="challenge">Challenge</Label>
              <Textarea 
                id="challenge"
                name="challenge"
                value={project.challenge || ''}
                onChange={onChange}
                placeholder="どのような課題に直面しましたか？"
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="solution">Solution</Label>
              <Textarea 
                id="solution"
                name="solution"
                value={project.solution || ''}
                onChange={onChange}
                placeholder="どのようにその課題を解決しましたか？"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Project Content (English)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="challenge_en">Challenge (English)</Label>
              <Textarea 
                id="challenge_en"
                name="challenge_en"
                value={project.challenge_en || ''}
                onChange={onChange}
                placeholder="What challenges did you face?"
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="solution_en">Solution (English)</Label>
              <Textarea 
                id="solution_en"
                name="solution_en"
                value={project.solution_en || ''}
                onChange={onChange}
                placeholder="How did you solve these challenges?"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="figmaUrl">Add Figma Prototype URL</Label>
        <div className="flex gap-2">
          <Input 
            id="figmaUrl"
            value={figmaUrl}
            onChange={(e) => onFigmaUrlChange(e.target.value)}
            placeholder="https://www.figma.com/proto/..."
            className="flex-1"
          />
          <Button 
            type="button" 
            onClick={handleAddFigmaUrl}
            disabled={!figmaUrl.trim()}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Paste a Figma prototype URL and it will be automatically converted to an embedded iframe.
        </p>
      </div>
      
      {iframeList.length > 0 && (
        <div className="space-y-2">
          <Label>Added Prototypes</Label>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {iframeList.map((iframe, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded bg-gray-50">
                <span className="text-sm text-gray-600 truncate flex-1">
                  {iframe.includes('figma.com') ? 'Figma Prototype' : 'Custom Embed'} #{index + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveIframe(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="embedCode">HTML Embed Code</Label>
        <Textarea 
          id="embedCode"
          name="embedCode"
          value={embedCodeInput}
          onChange={(e) => handleEmbedCodeTextareaChange(e.target.value)}
          placeholder='<iframe src="https://example.com/prototype" width="800" height="600"></iframe>

<iframe src="https://figma.com/embed?embed_host=share&url=..." width="800" height="450"></iframe>'
          rows={8}
          className="font-mono text-sm"
        />
        <p className="text-sm text-muted-foreground">
          Advanced users can manually edit HTML embed codes. Separate multiple embeds with two line breaks. 
          The first embed will be used as the main preview in the projects grid.
        </p>
      </div>
    </div>
  );
};

export default ContentForm;
