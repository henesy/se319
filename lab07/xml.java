import  org.antlr.v4.runtime.*;
import  org.antlr.v4.runtime.tree.*;
 
public  class MainParser {
    public static void main(String[] args)  {
     try {
           CharStream input = new ANTLRFileStream(args[0]);
           XMLLexer lex = new XMLLexer(input);
           CommonTokenStream tokens = new  CommonTokenStream(lex);
 
           XMLParser parser = new XMLParser(tokens);
           parser.document();
       }  catch(Throwable t) {
           System.out.println("exception: "+t);
           t.printStackTrace();
       }
    }
}