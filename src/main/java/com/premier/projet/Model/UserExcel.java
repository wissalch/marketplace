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

public class UserExcel {
	private XSSFWorkbook workbook;
    private XSSFSheet sheet;
    private List<User> listUser;
     
    public UserExcel(List<User> listUser) {
        this.listUser = listUser;
        workbook = new XSSFWorkbook();
    }
 
 
    private void writeHeaderLine() {
        sheet = workbook.createSheet("Users");
         
        Row row = sheet.createRow(0);
         
        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setBold(true);
        font.setFontHeight(16);
        style.setFont(font);
        createCell(row, 0, "User ID", style);      
        createCell(row, 1, "Username", style);       
        createCell(row, 2, "email", style);  
        createCell(row, 3, "login", style); 
        createCell(row, 4, "pwd", style); 
        createCell(row, 5, "role", style); 
        createCell(row, 6, "isActive", style); 
      
        
        
 
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
                 
        for (User us : listUser) {
            Row row = sheet.createRow(rowCount++);
            int columnCount = 0;
             
            createCell(row, columnCount++, us.getId(), style);
            createCell(row, columnCount++, us.getUsername(), style);
            createCell(row, columnCount++, us.getEmail(), style);
            createCell(row, columnCount++, us.getLogin(), style); 
            createCell(row, columnCount++, us.getPwd(), style);
            createCell(row, columnCount++, us.getRole(), style);
            createCell(row, columnCount++, us.isActive(), style);
             
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
