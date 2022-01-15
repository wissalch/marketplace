package com.premier.projet.Model;
import java.io.IOException;
import java.util.List;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import com.premier.projet.Dto.ListCategorie;

public class SouscategorieExcel {

	private XSSFWorkbook workbook;
    private XSSFSheet sheet;
    private List<ListCategorie> listCategories;
     
    public SouscategorieExcel(List<ListCategorie> listCategories2) {
        this.listCategories = listCategories2;
        workbook = new XSSFWorkbook();
    }
 
 
    private void writeHeaderLine() {
        sheet = workbook.createSheet("souscategories");
         
        Row row = sheet.createRow(0);
         
        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setBold(true);
        font.setFontHeight(16);
        style.setFont(font);
        createCell(row, 0, "Code Sous categorie", style);      
        createCell(row, 1, "Libelle Sous categorie", style);       
        createCell(row, 2, "Libelle Categorie", style);    
        createCell(row, 3, "Code Categorie", style);     
    }
     
    private void createCell(Row row, int columnCount, Object value, CellStyle style) {
        sheet.autoSizeColumn(columnCount);
        Cell cell = row.createCell(columnCount);
        if (value instanceof Integer) {
            cell.setCellValue((Integer) value);
        } else if (value instanceof Boolean) {
            cell.setCellValue((Boolean) value);
        }
     else if (value instanceof Long) {
        cell.setCellValue((Long) value);
    }
        
        else {
            cell.setCellValue((String) value);
        }
        cell.setCellStyle(style);
    }
     
    private void writeDataLines() {
        int rowCount = 1;
 
        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setFontHeight(14);
        style.setFont(font);
                 
        for (ListCategorie cat : listCategories) {
            Row row = sheet.createRow(rowCount++);
            int columnCount = 0;
             
            
            createCell(row, columnCount++, cat.getCode(), style);
            createCell(row, columnCount++, cat.getLibelle(), style);
            createCell(row, columnCount++, cat.getLibcateg(), style);
            createCell(row, columnCount++, cat.getCcateg(), style);
             
        }
    }
     
    public void export(HttpServletResponse response) throws IOException {
        writeHeaderLine();
        writeDataLines();
         
        ServletOutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        workbook.close();
         
        outputStream.close();
         
    }
}
