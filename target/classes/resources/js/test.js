var oOutput = Context.createOutputObject();
var xlTableActive=false;

oOutput.DefineF(getString("ID_STYLE_RD_HEADING_1"), getString("ID_DEFAULT_FONT"), 18, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_BOLD | Constants.FMT_LEFT| Constants.FMT_VTOP| Constants.FMT_TOCENTRY0 , 0, 0, 4, 4, 0, 1);
oOutput.DefineF(getString("ID_STYLE_RD_TABLE_HEAD"), getString("ID_DEFAULT_FONT"), 8, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_BOLD | Constants.FMT_CENTER| Constants.FMT_VTOP, 0, 0, 0, 0, 0, 1);
oOutput.DefineF(getString("ID_STYLE_RD_HEADING_4"), getString("ID_DEFAULT_FONT"), 12, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_ITALIC | Constants.FMT_BOLD | Constants.FMT_LEFT| Constants.FMT_VTOP| Constants.FMT_TOCENTRY3 , 0, 0, 0, 0, 0, 1);
oOutput.DefineF(getString("ID_STYLE_RD_DEFAULT"), getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT| Constants.FMT_VTOP, 0, 0, 0, 0, 0, 1);
oOutput.DefineF(getString("ID_STYLE_RD_HEADING_2"), getString("ID_DEFAULT_FONT"), 14, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_ITALIC | Constants.FMT_BOLD | Constants.FMT_LEFT| Constants.FMT_VTOP| Constants.FMT_TOCENTRY1 , 0, 0, 2, 2, 0, 1);
oOutput.DefineF(getString("ID_STYLE_RD_TITLE"), getString("ID_DEFAULT_FONT"), 21, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_BOLD | Constants.FMT_CENTER| Constants.FMT_VTOP, 0, 0, 1.76, 8.82, 0, 1);
oOutput.DefineF(getString("ID_STYLE_RD_HEADING_3"), getString("ID_DEFAULT_FONT"), 12, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_ITALIC | Constants.FMT_BOLD | Constants.FMT_LEFT| Constants.FMT_VTOP| Constants.FMT_TOCENTRY2 , 0, 0, 1, 1, 0, 1);
oOutput.DefineF(getString("ID_STYLE_RD_HEADER_FOOTER"), getString("ID_DEFAULT_FONT"), 10, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT| Constants.FMT_VTOP, 0, 0, 0, 0, 0, 1);
oOutput.DefineF(getString("ID_STYLE_RD_TABLE_CONTENT"), getString("ID_DEFAULT_FONT"), 8, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT| Constants.FMT_VTOP, 0, 0, 0, 0, 0, 1);
oOutput.DefineF(getString("ID_STYLE_RD_INFO"), getString("ID_DEFAULT_FONT"), 14, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_BOLD | Constants.FMT_CENTER| Constants.FMT_VTOP, 0, 0, 1.76, 8.82, 0, 1);
setupOutputObject( oOutput );
oOutput.SetTitle(Context.getScriptInfo(Constants.SCRIPT_NAME));

var nLocale = Context.getSelectedLanguage();
createSection1(oOutput, ArisData.getSelectedModels());
oOutput.WriteReport();

console.info("Console is here.");

/**
 * Apply default page format settings to output object
 * 
 * @param {Output}
 *            outputObj The output object
 */
function setupOutputObject(outputObj)
{
	outputObj.SetPageWidth(210.10)
	outputObj.SetPageHeight(297.20)
	outputObj.SetLeftMargin(20)
	outputObj.SetRightMargin(20)
	outputObj.SetTopMargin(30)
	outputObj.SetBottomMargin(15)
	outputObj.SetDistHeader(10)
	outputObj.SetDistFooter(10)
	outputObj.SetAutoTOCNumbering(true)
	globalHeader(outputObj)

	globalFooter(outputObj)
}


/**
 * initialize the head 
 * @param outputObj
 */
function globalHeader(outputObj) {
	outputObj.BeginHeader()
		if(Context.getSelectedFormat()!=Constants.OUTEXCEL)
			outputObj.BeginTable(100, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT, 0)
			outputObj.TableRow()
				outputObj.ResetFrameStyle()
				outputObj.SetFrameStyle( Constants.FRAME_TOP, 0, 0)
				outputObj.SetFrameStyle( Constants.FRAME_LEFT, 0, 0)
				outputObj.SetFrameStyle( Constants.FRAME_RIGHT, 0, 0)
				outputObj.TableCell("", 51.35, getString("ID_DEFAULT_FONT"), 10, Constants.C_BLACK, Constants.C_TRANSPARENT, 0,  Constants.FMT_VTOP |  Constants.FMT_LEFT, 0)
			outputObj.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
			outputObj.OutputLnF(getString("ID_REPORTDEF_6"), getString("ID_STYLE_RD_DEFAULT"))
			outputObj.EndParagraph()
			outputObj.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
			outputObj.OutputLnF("", getString("ID_STYLE_RD_DEFAULT"))
			outputObj.EndParagraph()
			outputObj.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
			outputObj.OutputLnF("", getString("ID_STYLE_RD_DEFAULT"))
			outputObj.EndParagraph()
				outputObj.TableCell("", 24.53, getString("ID_DEFAULT_FONT"), 10, Constants.C_BLACK, Constants.C_TRANSPARENT, 0,  Constants.FMT_VTOP |  Constants.FMT_LEFT, 0)
			outputObj.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
						var image = Context.createPicture("logo_recaro_klein2.JPG")
			outputObj.OutGraphic(image, -1, 39, 6 )

			outputObj.EndParagraph()
				outputObj.TableCell("", 24.12, getString("ID_DEFAULT_FONT"), 10, Constants.C_BLACK, Constants.C_TRANSPARENT, 0,  Constants.FMT_VTOP |  Constants.FMT_LEFT, 0)
			outputObj.BeginParagraph( Constants.FMT_LEFT, 0.71, 0.71, 0, 0, 0)
			outputObj.OutputLn(getString("ID_REPORTDEF_7"), getString("ID_DEFAULT_FONT"), 8, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT, 0.71)
			outputObj.EndParagraph()
			outputObj.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
			outputObj.OutputLnF("", getString("ID_STYLE_RD_DEFAULT"))
			outputObj.EndParagraph()
			outputObj.BeginParagraph( Constants.FMT_LEFT, 0.71, 0.71, 0, 0, 0)
			outputObj.OutputLn(getString("ID_REPORTDEF_8"), getString("ID_DEFAULT_FONT"), 8, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT, 0.71)
			outputObj.EndParagraph()
			outputObj.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
			outputObj.OutputLnF("", getString("ID_STYLE_RD_DEFAULT"))
			outputObj.EndParagraph()
		if(Context.getSelectedFormat()!=Constants.OUTEXCEL)
			outputObj.EndTable("", 100, getString("ID_DEFAULT_FONT"), 10, Constants.C_BLACK, Constants.C_TRANSPARENT, 0, Constants.FMT_LEFT, 0)
		else
			outputObj.TableRow()
	outputObj.EndHeader()
}
function globalFooter(outputObj) {
	outputObj.BeginFooter()
		if(Context.getSelectedFormat()!=Constants.OUTEXCEL)
			outputObj.BeginTable(100, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT, 0)
			outputObj.TableRow()
				outputObj.ResetFrameStyle()
				outputObj.SetFrameStyle( Constants.FRAME_LEFT, 0, 0)
				outputObj.SetFrameStyle( Constants.FRAME_BOTTOM, 0, 0)
				outputObj.SetFrameStyle( Constants.FRAME_RIGHT, 0, 0)
				outputObj.TableCell("", 100, getString("ID_DEFAULT_FONT"), 10, Constants.C_BLACK, Constants.C_TRANSPARENT, 0,  Constants.FMT_VTOP |  Constants.FMT_LEFT, 0)
			outputObj.BeginParagraph( Constants.FMT_LEFT, 0, 0, 0, 0, 0)
			outputObj.Output(getString("ID_REPORTDEF_9"), getString("ID_DEFAULT_FONT"), 9, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT, 0)
			outputObj.OutputField(Constants.FIELD_PAGE, getString("ID_DEFAULT_FONT"), 9, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT)
			outputObj.Output(getString("ID_REPORTDEF_10"), getString("ID_DEFAULT_FONT"), 9, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT, 0)
			outputObj.OutputField(Constants.FIELD_NUMPAGES, getString("ID_DEFAULT_FONT"), 9, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT)
			outputObj.OutputLn("", getString("ID_DEFAULT_FONT"), 9, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT, 0)
			outputObj.EndParagraph()
		if(Context.getSelectedFormat()!=Constants.OUTEXCEL)
			outputObj.EndTable("", 100, getString("ID_DEFAULT_FONT"), 10, Constants.C_BLACK, Constants.C_TRANSPARENT, 0, Constants.FMT_LEFT, 0)
		else
			outputObj.TableRow()
	outputObj.EndFooter()
}

/**
 * @param {Output}
 *            p_output The output object
 * @param {Model[]}
 *            p_aModel
 */
function createSection1(p_output, p_aModel)
{
	// do not create new section if all data is empty
	if(p_aModel.length==0)
		return

	// produce one table sheet per section
	if(xlTableActive && Context.getSelectedFormat()==Constants.OUTEXCEL) {
		p_output.EndTable("", 100, "", 10, Constants.C_BLACK, Constants.C_TRANSPARENT, 0, Constants.FMT_LEFT, 0)
		xlTableActive=false
	}
	p_output.BeginSection(false, Constants.SECTION_DEFAULT)
	setupOutputObject( p_output ) // use defaults
	if(Context.getSelectedFormat()==Constants.OUTEXCEL) {
		p_output.BeginTable(100, Constants.C_BLACK, Constants.C_TRANSPARENT,  Constants.FMT_LEFT | Constants.FMT_REPEAT_HEADER, 0)
		xlTableActive=true
	}
	// repetition of queried data:
	for(var i=0; i<p_aModel.length; i++) {
		p_output.BeginParagraph( Constants.FMT_LEFT, 0, 0, 0, 0, 0)
		p_output.OutputLn(getString("ID_REPORTDEF_11"), getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_BOLD  |  Constants.FMT_LEFT, 0)
		p_output.EndParagraph()
		p_output.BeginParagraph( Constants.FMT_LEFT, 0, 0, 0, 0, 0)
		writeData(p_output, p_aModel[i].Attribute(Constants.AT_CRT_BY, nLocale).GetValue(false))
		p_output.OutputLn(getString("ID_REPORTDEF_12"), getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT, 0)
		p_output.EndParagraph()
		p_output.BeginParagraph( Constants.FMT_LEFT, 0, 0, 0, 0, 0)
		p_output.OutputLn(getString("ID_REPORTDEF_13"), getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_BOLD  |  Constants.FMT_LEFT, 0)
		p_output.EndParagraph()
		p_output.BeginParagraph( Constants.FMT_LEFT, 0, 0, 0, 0, 0)
		writeData1(p_output, p_aModel[i].Attribute(Constants.AT_CRT_ON, nLocale).GetValue(false))
		p_output.EndParagraph()
		p_output.BeginParagraph( Constants.FMT_LEFT, 0, 0, 0, 0, 0)
		p_output.OutputLn(getString("ID_REPORTDEF_14"), getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_BOLD  |  Constants.FMT_LEFT, 0)
		p_output.EndParagraph()
		p_output.BeginParagraph( Constants.FMT_LEFT, 0, 0, 0, 0, 0)
		writeData2(p_output, p_aModel[i].Attribute(Constants.AT_CHK_BY, nLocale).GetValue(false))
		p_output.EndParagraph()
		p_output.BeginParagraph( Constants.FMT_LEFT, 0, 0, 0, 0, 0)
		p_output.OutputLn(getString("ID_REPORTDEF_15"), getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_BOLD  |  Constants.FMT_LEFT, 0)
		p_output.EndParagraph()
		p_output.BeginParagraph( Constants.FMT_LEFT, 0, 0, 0, 0, 0)
		writeData3(p_output, p_aModel[i].Attribute(Constants.AT_CHK_ON, nLocale).GetValue(false))
		p_output.EndParagraph()
		p_output.BeginParagraph( Constants.FMT_LEFT, 0, 0, 0, 0, 0)
		p_output.OutputLn(getString("ID_REPORTDEF_16"), getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_BOLD  |  Constants.FMT_LEFT, 0)
		p_output.EndParagraph()
		p_output.BeginParagraph( Constants.FMT_LEFT, 0, 0, 0, 0, 0)
		writeData4(p_output, p_aModel[i].Attribute(Constants.AT_REL_BY, nLocale).GetValue(false))
		p_output.EndParagraph()
		p_output.BeginParagraph( Constants.FMT_LEFT, 0, 0, 0, 0, 0)
		p_output.OutputLn(getString("ID_REPORTDEF_17"), getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_BOLD  |  Constants.FMT_LEFT, 0)
		p_output.EndParagraph()
		p_output.BeginParagraph( Constants.FMT_LEFT, 0, 0, 0, 0, 0)
		writeData5(p_output, p_aModel[i].Attribute(Constants.AT_REL_ON, nLocale).GetValue(false))
		p_output.EndParagraph()
		p_output.BeginParagraph( Constants.FMT_LEFT, 0, 0, 0, 0, 0)
		p_output.OutputLn(getString("ID_REPORTDEF_18"), getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_BOLD  |  Constants.FMT_LEFT, 0)
		p_output.EndParagraph()
		p_output.BeginParagraph( Constants.FMT_LEFT, 0, 0, 0, 0, 0)
		writeData6(p_output, p_aModel[i].Attribute(Constants.AT_UA_TXT_10, nLocale).GetValue(false))
		p_output.EndParagraph()
		p_output.BeginParagraph( Constants.FMT_LEFT, 0, 0, 0, 0, 0)
		p_output.OutputLn(getString("ID_REPORTDEF_19"), getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_BOLD  |  Constants.FMT_LEFT, 0)
		p_output.EndParagraph()
		p_output.BeginParagraph( Constants.FMT_LEFT, 0, 0, 0, 0, 0)
		writeData7(p_output, p_aModel[i].Attribute(Constants.AT_UA_TXT_11, nLocale).GetValue(false))
		p_output.EndParagraph()
		p_output.addLocalBookmark ( "2" )
		p_output.BeginParagraphF(getString("ID_STYLE_RD_HEADING_1"))
		p_output.OutputLn(getString("ID_REPORTDEF_20"), getString("ID_DEFAULT_FONT"), 18, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT| Constants.FMT_TOCENTRY0 , 0)
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		p_output.OutputLn(getString("ID_REPORTDEF_21"), getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_BOLD  |  Constants.FMT_LEFT, 0)
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		writeData8(p_output, p_aModel[i].Attribute(Constants.AT_VALID, nLocale).GetValue(false))
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		p_output.OutputLn(getString("ID_REPORTDEF_22"), getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_BOLD  |  Constants.FMT_LEFT, 0)
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		writeData9(p_output, p_aModel[i].Attribute(Constants.AT_EXT_DOC_1, nLocale).GetValue(false))
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		p_output.OutputLn(getString("ID_REPORTDEF_23"), getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_BOLD  |  Constants.FMT_LEFT, 0)
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		writeData10(p_output, p_aModel[i].Attribute(Constants.AT_UA_TXT_14, nLocale).GetValue(false))
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		p_output.OutputLn(getString("ID_REPORTDEF_24"), getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_BOLD  |  Constants.FMT_LEFT, 0)
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		writeData11(p_output, p_aModel[i].Attribute(Constants.AT_UA_TXT_15, nLocale).GetValue(false))
		p_output.EndParagraph()
		p_output.OutputField( Constants.FIELD_NEWPAGE, getString("ID_DEFAULT_FONT"), 11, Constants.C_BLACK, Constants.C_TRANSPARENT, Constants.FMT_LEFT)
		p_output.addLocalBookmark ( "6" )
		p_output.BeginParagraphF(getString("ID_STYLE_RD_HEADING_1"))
		p_output.OutputLn(getString("ID_REPORTDEF_25"), getString("ID_DEFAULT_FONT"), 18, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT| Constants.FMT_TOCENTRY0 , 0)
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		writeData12(p_output, p_aModel[i].Graphic(false, false, nLocale))
		p_output.EndParagraph()
		p_output.OutputField( Constants.FIELD_NEWPAGE, getString("ID_DEFAULT_FONT"), 11, Constants.C_BLACK, Constants.C_TRANSPARENT, Constants.FMT_LEFT)
		p_output.addLocalBookmark ( "6" )
		p_output.BeginParagraphF(getString("ID_STYLE_RD_HEADING_1"))
		p_output.OutputLn(getString("ID_REPORTDEF_26"), getString("ID_DEFAULT_FONT"), 18, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT| Constants.FMT_TOCENTRY0 , 0)
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		p_output.OutputLn(getString("ID_REPORTDEF_27"), getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_BOLD  |  Constants.FMT_LEFT, 0)
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		writeData13(p_output, p_aModel[i].Attribute(Constants.AT_UA_TXT_103, nLocale).GetValue(false))
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		p_output.OutputLn(getString("ID_REPORTDEF_28"), getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_BOLD  |  Constants.FMT_LEFT, 0)
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		p_output.OutputLnF("", getString("ID_STYLE_RD_DEFAULT"))
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		p_output.OutputLn(getString("ID_REPORTDEF_29"), getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_BOLD  |  Constants.FMT_LEFT, 0)
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		p_output.OutputLnF("", getString("ID_STYLE_RD_DEFAULT"))
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		p_output.OutputLn(getString("ID_REPORTDEF_30"), getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_BOLD  |  Constants.FMT_LEFT, 0)
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		writeData14(p_output, p_aModel[i].Attribute(Constants.AT_UA_TXT_8, nLocale).GetValue(false))
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		p_output.OutputLn(getString("ID_REPORTDEF_31"), getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_BOLD  |  Constants.FMT_LEFT, 0)
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		writeData15(p_output, p_aModel[i].Attribute(Constants.AT_UA_TXT_13, nLocale).GetValue(false))
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		p_output.OutputLn(getString("ID_REPORTDEF_32"), getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_BOLD  |  Constants.FMT_LEFT, 0)
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		writeData16(p_output, p_aModel[i].Attribute(Constants.AT_UA_TXT_16, nLocale).GetValue(false))
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		p_output.OutputLn(getString("ID_REPORTDEF_33"), getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_BOLD  |  Constants.FMT_LEFT, 0)
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		writeData17(p_output, p_aModel[i].Attribute(Constants.AT_UA_TXT_9, nLocale).GetValue(false))
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		p_output.OutputLn(getString("ID_REPORTDEF_34"), getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_BOLD  |  Constants.FMT_LEFT, 0)
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		writeData18(p_output, p_aModel[i].Attribute(Constants.AT_UA_TXT_12, nLocale).GetValue(false))
		p_output.EndParagraph()
		p_output.addLocalBookmark ( "8" )
		p_output.BeginParagraphF(getString("ID_STYLE_RD_HEADING_1"))
		p_output.OutputLn(getString("ID_REPORTDEF_35"), getString("ID_DEFAULT_FONT"), 18, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT| Constants.FMT_TOCENTRY0 , 0)
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		writeData19(p_output, p_aModel[i].Attribute(Constants.AT_UA_TXT_7, nLocale).GetValue(false))
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		p_output.OutputLn(getString("ID_REPORTDEF_36"), getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_BOLD  |  Constants.FMT_LEFT, 0)
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		writeData20(p_output, p_aModel[i].Attribute(Constants.AT_DISTR_LST, nLocale).GetValue(false))
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		p_output.OutputLn(getString("ID_REPORTDEF_37"), getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_BOLD  |  Constants.FMT_LEFT, 0)
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		writeData21(p_output, p_aModel[i].Attribute(Constants.AT_UA_TXT_101, nLocale).GetValue(false))
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		p_output.OutputLnF("", getString("ID_STYLE_RD_DEFAULT"))
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		p_output.OutputLnF("", getString("ID_STYLE_RD_DEFAULT"))
		p_output.EndParagraph()
		p_output.BeginParagraphF(getString("ID_STYLE_RD_DEFAULT"))
		p_output.OutputLnF("", getString("ID_STYLE_RD_DEFAULT"))
		p_output.EndParagraph()
	}

	// createSection1 local functions:
	/**
	 * @param {Output}
	 *            p_output The output object
	 * @param {Object }
	 *            p_Object
	 */
	function writeData(p_output, p_Object) {
		p_output.Output(p_Object, getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT, 0)
	}
	/**
	 * @param {Output}
	 *            p_output The output object
	 * @param {Object }
	 *            p_Object
	 */
	function writeData1(p_output, p_Object) {
		p_output.OutputLn(p_Object, getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT, 0)
	}
	/**
	 * @param {Output}
	 *            p_output The output object
	 * @param {Object }
	 *            p_Object
	 */
	function writeData2(p_output, p_Object) {
		p_output.OutputLn(p_Object, getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT, 0)
	}
	/**
	 * @param {Output}
	 *            p_output The output object
	 * @param {Object }
	 *            p_Object
	 */
	function writeData3(p_output, p_Object) {
		p_output.OutputLn(p_Object, getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT, 0)
	}
	/**
	 * @param {Output}
	 *            p_output The output object
	 * @param {Object }
	 *            p_Object
	 */
	function writeData4(p_output, p_Object) {
		p_output.OutputLn(p_Object, getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT, 0)
	}
	/**
	 * @param {Output}
	 *            p_output The output object
	 * @param {Object }
	 *            p_Object
	 */
	function writeData5(p_output, p_Object) {
		p_output.OutputLn(p_Object, getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT, 0)
	}
	/**
	 * @param {Output}
	 *            p_output The output object
	 * @param {Object }
	 *            p_Object
	 */
	function writeData6(p_output, p_Object) {
		p_output.OutputLn(p_Object, getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT, 0)
	}
	/**
	 * @param {Output}
	 *            p_output The output object
	 * @param {Object }
	 *            p_Object
	 */
	function writeData7(p_output, p_Object) {
		p_output.OutputLn(p_Object, getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT, 0)
	}
	/**
	 * @param {Output}
	 *            p_output The output object
	 * @param {Object }
	 *            p_Object
	 */
	function writeData8(p_output, p_Object) {
		p_output.OutputLn(p_Object, getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT, 0)
	}
	/**
	 * @param {Output}
	 *            p_output The output object
	 * @param {Object }
	 *            p_Object
	 */
	function writeData9(p_output, p_Object) {
		p_output.OutputLn(p_Object, getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT, 0)
	}
	/**
	 * @param {Output}
	 *            p_output The output object
	 * @param {Object }
	 *            p_Object
	 */
	function writeData10(p_output, p_Object) {
		p_output.OutputLnF(p_Object, getString("ID_STYLE_RD_DEFAULT"))
	}
	/**
	 * @param {Output}
	 *            p_output The output object
	 * @param {Object }
	 *            p_Object
	 */
	function writeData11(p_output, p_Object) {
		p_output.OutputLnF(p_Object, getString("ID_STYLE_RD_DEFAULT"))
	}
	/**
	 * @param {Output}
	 *            p_output The output object
	 * @param {IModelPicture }
	 *            p_IModelPicture
	 */
	function writeData12(p_output, p_IModelPicture) {
		p_output.OutGraphic(p_IModelPicture, -1, p_output.getCurrentMaxWidth(), p_output.GetPageHeight() - p_output.GetTopMargin() - p_output.GetBottomMargin() -10)
	}
	/**
	 * @param {Output}
	 *            p_output The output object
	 * @param {Object }
	 *            p_Object
	 */
	function writeData13(p_output, p_Object) {
		p_output.OutputLn(p_Object, getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT, 0)
	}
	/**
	 * @param {Output}
	 *            p_output The output object
	 * @param {Object }
	 *            p_Object
	 */
	function writeData14(p_output, p_Object) {
		p_output.OutputLn(p_Object, getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT, 0)
	}
	/**
	 * @param {Output}
	 *            p_output The output object
	 * @param {Object }
	 *            p_Object
	 */
	function writeData15(p_output, p_Object) {
		p_output.OutputLn(p_Object, getString("ID_DEFAULT_FONT"), 11, RGB(0,0,0), Constants.C_TRANSPARENT,  Constants.FMT_LEFT, 0)
	}
	/**
	 * @param {Output}
	 *            p_output The output object
	 * @param {Object }
	 *            p_Object
	 */
	function writeData16(p_output, p_Object) {
		p_output.OutputLnF(p_Object, getString("ID_STYLE_RD_DEFAULT"))
	}
	/**
	 * @param {Output}
	 *            p_output The output object
	 * @param {Object }
	 *            p_Object
	 */
	function writeData17(p_output, p_Object) {
		p_output.OutputLnF(p_Object, getString("ID_STYLE_RD_DEFAULT"))
	}
	/**
	 * @param {Output}
	 *            p_output The output object
	 * @param {Object }
	 *            p_Object
	 */
	function writeData18(p_output, p_Object) {
		p_output.OutputLnF(p_Object, getString("ID_STYLE_RD_DEFAULT"))
	}
	/**
	 * @param {Output}
	 *            p_output The output object
	 * @param {Object }
	 *            p_Object
	 */
	function writeData19(p_output, p_Object) {
		p_output.OutputLnF(p_Object, getString("ID_STYLE_RD_DEFAULT"))
	}
	/**
	 * @param {Output}
	 *            p_output The output object
	 * @param {Object }
	 *            p_Object
	 */
	function writeData20(p_output, p_Object) {
		p_output.OutputLnF(p_Object, getString("ID_STYLE_RD_DEFAULT"))
	}
	/**
	 * @param {Output}
	 *            p_output The output object
	 * @param {Object }
	 *            p_Object
	 */
	function writeData21(p_output, p_Object) {
		p_output.OutputLnF(p_Object, getString("ID_STYLE_RD_DEFAULT"))
	}
	if(Context.getSelectedFormat()==Constants.OUTEXCEL) {
		p_output.EndTable(getString("ID_REPORTDEF_2"), 100, "", 10, Constants.C_BLACK, Constants.C_TRANSPARENT, 0, Constants.FMT_LEFT, 0)
		xlTableActive=false
	}
	p_output.EndSection()

}


function RGB(r, g, b) {
	return (new java.awt.Color(r/255.0,g/255.0,b/255.0,1)).getRGB() & 0xFFFFFF
}
