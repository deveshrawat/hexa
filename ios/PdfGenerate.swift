//
//  PdfGenerate.swift
//  HEXA
//
//  Created by developer on 19/12/19.
//  Copyright © 2019 Facebook. All rights reserved.
//


import Foundation
import PDFGenerator
import QRCoder


@objc class PdfGenerate : NSObject {
  @objc public var title:NSString = "";
  @objc public var pdfPath:NSString = "";
  @objc public var password:NSString = "";
  @objc public var qrcode:NSArray = [];
  @objc public var qrCodeString:NSArray = [];
  @objc public var secondaryXpub:NSString = "";
  @objc public var twoFAQR:NSString = "";
  @objc public var twoFASecret:NSString = "";
  @objc public var secondaryMnemonic:NSString = "";
  @objc public var bhXpub:NSString = "";
  @objc public var imageSize:CGFloat = 110;
  @objc public var margin:CGFloat = 10;
  
  
  @objc public func generatePdf() -> String {
    
    
    
    //        var image: UIImage? =
    //              "Test".image(withAttributes: [
    //                  .foregroundColor: UIColor.red,
    //                  .font: UIFont.systemFont(ofSize: 30.0),
    //                ], size: CGSize(width: 300.0, height: 80.0)
    
    //  // Or
    //  var image:UIImage? = "Test".image(withAttributes: [.font: UIFont.systemFont(ofSize: 80.0)])
    //
    //  // Or
    //  image = "Test".image(size: CGSize(width: 300.0, height: 80.0))
    
    // Or even just
    //var image:UIImage? = "Test".image()  
    
    print("qrcodestring=",qrCodeString)
    print("working");
    var txtTitle = UILabel();
    var txtPart = UILabel();
    var txtQrCodeString = UILabel();
    var txtMessage = UILabel();
    var qrCodeImage = UIImageView();
    var generator = QRCodeGenerator();
    
    //page 1
    let v1 =   UIView( frame: CGRect(x: 0.0,y: 0, width: 210.0, height: 297.0))
    
    txtTitle.text = title as String
    txtTitle.lineBreakMode = .byWordWrapping
    txtTitle.numberOfLines = 0
    txtTitle.frame = CGRect(x:5,y:5,width:v1.bounds.size.width - 5, height:v1.bounds.size.height)
    txtTitle.font = UIFont.systemFont(ofSize: 10.0)
    txtTitle.textColor = UIColor.black
    txtTitle.textAlignment = .left
    txtTitle.sizeToFit()
    v1.addSubview(txtTitle)

    let txtSubHeading = UILabel();
    txtSubHeading.text = "Follow the instructions on the app to scan the 8 QRs below"
    txtSubHeading.lineBreakMode = .byWordWrapping
    txtSubHeading.numberOfLines = 0
    txtSubHeading.frame = CGRect(x:10,y:txtTitle.frame.height + txtTitle.font.ascender-1,width:v1.bounds.size.width - 10, height:v1.bounds.size.height)
    txtSubHeading.font = UIFont.systemFont(ofSize: 6.0)
    txtSubHeading.textColor = UIColor.black
    txtSubHeading.textAlignment = .left
    txtSubHeading.sizeToFit()
    v1.addSubview(txtSubHeading)
    
    //          let imageTitle:UIImage? = (title as String).image(withAttributes: [.font: UIFont.systemFont(ofSize: 80.0)])
    //          let imageViewTitle = UIImageView()
    //          imageViewTitle.image  = imageTitle;
    //          imageViewTitle.frame = CGRect(x:5,y:5,width:30, height:8)
    //          v1.addSubview(imageViewTitle)
    
    // part 1
    txtPart = UILabel();
    txtPart.text = "Part 1:"
    txtPart.lineBreakMode = .byWordWrapping
    txtPart.numberOfLines = 0
    txtPart.frame = CGRect(x:10,y:txtTitle.frame.height + txtTitle.font.ascender + txtSubHeading.frame.height + txtSubHeading.font.ascender - 5,width:v1.bounds.size.width - 10, height:v1.bounds.size.height)
    txtPart.font = UIFont.systemFont(ofSize: 6.0)
    txtPart.textColor = UIColor.black
    txtPart.textAlignment = .left
    txtPart.sizeToFit()
    v1.addSubview(txtPart)
    
    //        let imagePart1:UIImage? = "Part 1:".image(withAttributes: [.font: UIFont.systemFont(ofSize: 40.0)])
    //        let imageViewPart1 = UIImageView()
    //        imageViewPart1.image = imagePart1;
    //        imageViewPart1.frame = CGRect(x:10,y:(imageViewTitle.frame.origin.y + imageViewTitle.frame.height),width:15, height:5)
    //        v1.addSubview(imageViewPart1)
    
    qrCodeImage.image = generator.createImage(value: qrcode[0] as! String,size: CGSize(width: imageSize, height: imageSize))
    qrCodeImage.frame = CGRect(x: 10, y: (txtPart.frame.origin.y +  txtPart.frame.height) , width: imageSize, height: imageSize)
    v1.addSubview(qrCodeImage)
    
//    txtQrCodeString.text = qrCodeString[0] as? String;
//    txtQrCodeString.lineBreakMode = .byWordWrapping
//    txtQrCodeString.numberOfLines = 0
//    txtQrCodeString.frame = CGRect(x:5,y: ( qrCodeImage.frame.origin.y + qrCodeImage.frame.height + 2),width:v1.bounds.size.width - 10, height:v1.bounds.size.height)
//    txtQrCodeString.font = UIFont.systemFont(ofSize: 5.5)
//    txtQrCodeString.textColor = UIColor.black
//    txtQrCodeString.textAlignment = .center
//    txtQrCodeString.sizeToFit()
//    v1.addSubview(txtQrCodeString)
    
    // part 2
    txtPart = UILabel();
    txtPart.text = "Part 2:"
    txtPart.lineBreakMode = .byWordWrapping
    txtPart.numberOfLines = 0
    txtPart.frame = CGRect(x:10,y:qrCodeImage.frame.origin
      .y+qrCodeImage.frame.height + margin,width:v1.bounds.size.width - 10, height:v1.bounds.size.height)
    txtPart.font = UIFont.systemFont(ofSize: 6.0) // txtPart.font.withSize(40)
    txtPart.textColor = UIColor.black
    txtPart.textAlignment = .left
    txtPart.sizeToFit()
    v1.addSubview(txtPart)
    
    
    qrCodeImage = UIImageView();
    generator = QRCodeGenerator();
    qrCodeImage.image = generator.createImage(value: qrcode[1] as! String,size: CGSize(width: imageSize, height: imageSize))
    qrCodeImage.frame = CGRect(x: 10, y: (txtPart.frame.origin.y + txtPart.frame.height), width: imageSize, height: imageSize)
    v1.addSubview(qrCodeImage)
    
//    txtQrCodeString = UILabel();
//    txtQrCodeString.text = qrCodeString[1] as? String;
//    txtQrCodeString.lineBreakMode = .byWordWrapping
//    txtQrCodeString.numberOfLines = 0
//    txtQrCodeString.frame = CGRect(x:5,y:(qrCodeImage.frame.origin.y + qrCodeImage.frame.size.height + 2),width:v1.bounds.size.width - 10, height:v1.bounds.size.height)
//    txtQrCodeString.font =  UIFont.systemFont(ofSize: 5.5)
//    txtQrCodeString.textColor = UIColor.black
//    txtQrCodeString.textAlignment = .center
//    txtQrCodeString.sizeToFit()
//    v1.addSubview(txtQrCodeString)
    
    // page 2
    let v2 = UIView( frame: CGRect(x: 0.0,y: 0, width: 210.0, height: 297.0))
    // part 3
    txtPart = UILabel();
    txtPart.text = "Part 3:"
    txtPart.lineBreakMode = .byWordWrapping
    txtPart.numberOfLines = 0
    txtPart.frame = CGRect(x:10,y:10,width:v1.bounds.size.width - 10, height:v1.bounds.size.height)
    txtPart.font =  UIFont.systemFont(ofSize: 6.0)
    txtPart.textColor = UIColor.black
    txtPart.textAlignment = .left
    txtPart.sizeToFit()
    v2.addSubview(txtPart)
    
    
    qrCodeImage = UIImageView();
    generator = QRCodeGenerator();
    qrCodeImage.image = generator.createImage(value: qrcode[2] as! String,size: CGSize(width: imageSize, height: imageSize))
    qrCodeImage.frame = CGRect(x: 10, y: ( txtPart.frame.origin.y + txtPart.frame.height) , width: imageSize, height: imageSize)
    v2.addSubview(qrCodeImage)
    
//    txtQrCodeString = UILabel();
//    txtQrCodeString.text = qrCodeString[2] as? String;
//    txtQrCodeString.lineBreakMode = .byWordWrapping
//    txtQrCodeString.numberOfLines = 0
//    txtQrCodeString.frame = CGRect(x:5,y: ( qrCodeImage.frame.origin.y + qrCodeImage.frame.height),width:v1.bounds.size.width - 10, height:v1.bounds.size.height)
//    txtQrCodeString.font =  UIFont.systemFont(ofSize: 5.5)
//    txtQrCodeString.textColor = UIColor.black
//    txtQrCodeString.textAlignment = .center
//    txtQrCodeString.sizeToFit()
//    v2.addSubview(txtQrCodeString)
    
    // part 4
    txtPart = UILabel();
    txtPart.text = "Part 4:"
    txtPart.lineBreakMode = .byWordWrapping
    txtPart.numberOfLines = 0
    txtPart.frame = CGRect(x:10,y:qrCodeImage.frame.origin
      .y+qrCodeImage.frame.height + margin,width:v1.bounds.size.width - 10, height:v1.bounds.size.height)
    txtPart.font =  UIFont.systemFont(ofSize: 6.0)
    txtPart.textColor = UIColor.black
    txtPart.textAlignment = .left
    txtPart.sizeToFit()
    v2.addSubview(txtPart)
    
    
    qrCodeImage = UIImageView();
    generator = QRCodeGenerator();
    qrCodeImage.image = generator.createImage(value: qrcode[3] as! String,size: CGSize(width: imageSize, height: imageSize))
    qrCodeImage.frame = CGRect(x: 10, y: (txtPart.frame.origin.y + txtPart.frame.height), width: imageSize, height: imageSize)
    v2.addSubview(qrCodeImage)
    
//    txtQrCodeString = UILabel();
//    txtQrCodeString.text = qrCodeString[3] as? String;
//    txtQrCodeString.lineBreakMode = .byWordWrapping
//    txtQrCodeString.numberOfLines = 0
//    txtQrCodeString.frame = CGRect(x:5,y:(qrCodeImage.frame.origin.y + qrCodeImage.frame.size.height),width:v1.bounds.size.width - 10, height:v1.bounds.size.height)
//    txtQrCodeString.font =  UIFont.systemFont(ofSize: 5.5)
//    txtQrCodeString.textColor = UIColor.black
//    txtQrCodeString.textAlignment = .center
//    txtQrCodeString.sizeToFit()
//    v2.addSubview(txtQrCodeString);
    
    // page 3
    let v3 = UIView( frame: CGRect(x: 0.0,y: 0, width: 210.0, height: 297.0))
    // part 5
    txtPart = UILabel();
    txtPart.text = "Part 5:"
    txtPart.lineBreakMode = .byWordWrapping
    txtPart.numberOfLines = 0
    txtPart.frame = CGRect(x:10,y:10,width:v1.bounds.size.width - 10, height:v1.bounds.size.height)
    txtPart.font =  UIFont.systemFont(ofSize: 6.0)
    txtPart.textColor = UIColor.black
    txtPart.textAlignment = .left
    txtPart.sizeToFit()
    v3.addSubview(txtPart)
    
    
    qrCodeImage = UIImageView();
    generator = QRCodeGenerator();
    qrCodeImage.image = generator.createImage(value: qrcode[4] as! String,size: CGSize(width: imageSize, height: imageSize))
    qrCodeImage.frame = CGRect(x: 10, y: ( txtPart.frame.origin.y + txtPart.frame.height) , width: imageSize, height: imageSize)
    v3.addSubview(qrCodeImage)
    
//    txtQrCodeString = UILabel();
//    txtQrCodeString.text = qrCodeString[4] as? String;
//    txtQrCodeString.lineBreakMode = .byWordWrapping
//    txtQrCodeString.numberOfLines = 0
//    txtQrCodeString.frame = CGRect(x:5,y: ( qrCodeImage.frame.origin.y + qrCodeImage.frame.height),width:v1.bounds.size.width - 10, height:v1.bounds.size.height)
//    txtQrCodeString.font =  UIFont.systemFont(ofSize: 5.5)
//    txtQrCodeString.textColor = UIColor.black
//    txtQrCodeString.textAlignment = .center
//    txtQrCodeString.sizeToFit()
//    v3.addSubview(txtQrCodeString)
    
    // part 4
    txtPart = UILabel();
    txtPart.text = "Part 6:"
    txtPart.lineBreakMode = .byWordWrapping
    txtPart.numberOfLines = 0
    txtPart.frame = CGRect(x:10,y:qrCodeImage.frame.origin
      .y+qrCodeImage.frame.height + margin,width:v1.bounds.size.width - 10, height:v1.bounds.size.height)
    txtPart.font = UIFont.systemFont(ofSize: 6.0)
    txtPart.textColor = UIColor.black
    txtPart.textAlignment = .left
    txtPart.sizeToFit()
    v3.addSubview(txtPart)
    qrCodeImage = UIImageView();
    generator = QRCodeGenerator();
    qrCodeImage.image = generator.createImage(value: qrcode[5] as! String,size: CGSize(width: imageSize, height: imageSize))
    qrCodeImage.frame = CGRect(x: 10, y: (txtPart.frame.origin.y + txtPart.frame.height), width: imageSize, height: imageSize)
    v3.addSubview(qrCodeImage)
//    txtQrCodeString = UILabel();
//    txtQrCodeString.text = qrCodeString[5] as? String;
//    txtQrCodeString.lineBreakMode = .byWordWrapping
//    txtQrCodeString.numberOfLines = 0
//    txtQrCodeString.frame = CGRect(x:5,y:(qrCodeImage.frame.origin.y + qrCodeImage.frame.size.height),width:v1.bounds.size.width - 10, height:v1.bounds.size.height)
//    txtQrCodeString.font = UIFont.systemFont(ofSize: 5.5)
//    txtQrCodeString.textColor = UIColor.black
//    txtQrCodeString.textAlignment = .center
//    txtQrCodeString.sizeToFit()
//    v3.addSubview(txtQrCodeString)
    
    // page 4
    let v4 = UIView( frame: CGRect(x: 0.0,y: 0, width: 210.0, height: 297.0))
    // part 5
    txtPart = UILabel();
    txtPart.text = "Part 7:"
    txtPart.lineBreakMode = .byWordWrapping
    txtPart.numberOfLines = 0
    txtPart.frame = CGRect(x:10,y:10,width:v1.bounds.size.width - 10, height:v1.bounds.size.height)
    txtPart.font =  UIFont.systemFont(ofSize: 6.0)
    txtPart.textColor = UIColor.black
    txtPart.textAlignment = .left
    txtPart.sizeToFit()
    v4.addSubview(txtPart)
    qrCodeImage = UIImageView();
    generator = QRCodeGenerator();
    qrCodeImage.image = generator.createImage(value: qrcode[6] as! String,size: CGSize(width: imageSize, height: imageSize))
    qrCodeImage.frame = CGRect(x: 10, y: ( txtPart.frame.origin.y + txtPart.frame.height) , width: imageSize, height: imageSize)
    v4.addSubview(qrCodeImage)
//    txtQrCodeString = UILabel();
//    txtQrCodeString.text = qrCodeString[6] as? String;
//    txtQrCodeString.lineBreakMode = .byWordWrapping
//    txtQrCodeString.numberOfLines = 0
//    txtQrCodeString.frame = CGRect(x:5,y: ( qrCodeImage.frame.origin.y + qrCodeImage.frame.height),width:v1.bounds.size.width - 10, height:v1.bounds.size.height)
//    txtQrCodeString.font =  UIFont.systemFont(ofSize: 5.5)
//    txtQrCodeString.textColor = UIColor.black
//    txtQrCodeString.textAlignment = .center
//    txtQrCodeString.sizeToFit()
//    v4.addSubview(txtQrCodeString)
    // part 4
    txtPart = UILabel();
    txtPart.text = "Part 8:"
    txtPart.lineBreakMode = .byWordWrapping
    txtPart.numberOfLines = 0
    txtPart.frame = CGRect(x:10,y:qrCodeImage.frame.origin
      .y+qrCodeImage.frame.height + margin,width:v1.bounds.size.width - 10, height:v1.bounds.size.height)
    txtPart.font =  UIFont.systemFont(ofSize: 6.0)
    txtPart.textColor = UIColor.black
    txtPart.textAlignment = .left
    txtPart.sizeToFit()
    v4.addSubview(txtPart)
    qrCodeImage = UIImageView();
    generator = QRCodeGenerator();
    qrCodeImage.image = generator.createImage(value: qrcode[7] as! String,size: CGSize(width: imageSize, height: imageSize))
    qrCodeImage.frame = CGRect(x: 10, y: (txtPart.frame.origin.y + txtPart.frame.height), width: imageSize, height: imageSize);
    v4.addSubview(qrCodeImage);
//    txtQrCodeString = UILabel();
//    txtQrCodeString.text =  qrCodeString[7] as? String;
//    txtQrCodeString.lineBreakMode = .byWordWrapping
//    txtQrCodeString.numberOfLines = 0
//    txtQrCodeString.frame = CGRect(x:5,y:(qrCodeImage.frame.origin.y + qrCodeImage.frame.size.height),width:v4.bounds.size.width - 10, height:v4.bounds.size.height)
//    txtQrCodeString.font =  UIFont.systemFont(ofSize: 5.5)
//    txtQrCodeString.textColor = UIColor.black
//    txtQrCodeString.textAlignment = .center
//    txtQrCodeString.sizeToFit()
//    v4.addSubview(txtQrCodeString)
    
    
    //page 5
     let v5 = UIView( frame: CGRect(x: 0.0,y: 0, width: 210.0, height: 297.0))
    // txtTitle = UILabel();
    // txtTitle.text = "Secondary Xpub (Encrypted):"
    // txtTitle.lineBreakMode = .byWordWrapping
    // txtTitle.numberOfLines = 0
    // txtTitle.frame = CGRect(x:5,y:5,width:v1.bounds.size.width - 5, height:v1.bounds.size.height)
    // txtTitle.font =  UIFont.systemFont(ofSize: 10.0)
    // txtTitle.textAlignment = .left
    // txtTitle.sizeToFit()
    // v5.addSubview(txtTitle)
    // qrCodeImage = UIImageView();
    // generator = QRCodeGenerator();
    // qrCodeImage.image = generator.createImage(value: secondaryXpub as String,size: CGSize(width: 80, height: 70))
    // qrCodeImage.frame = CGRect(x: 10, y: ( txtTitle.frame.origin.y + txtTitle.frame.height) , width: 80, height: 80)
    // v5.addSubview(qrCodeImage)
    
    // txtQrCodeString = UILabel();
    // txtQrCodeString.text = secondaryXpub as? String
    // txtQrCodeString.lineBreakMode = .byWordWrapping
    // txtQrCodeString.numberOfLines = 0
    // txtQrCodeString.frame = CGRect(x:5,y: ( qrCodeImage.frame.origin.y + qrCodeImage.frame.height),width:v1.bounds.size.width - 10, height:v1.bounds.size.height)
    // txtQrCodeString.font =  UIFont.systemFont(ofSize: 6.0)
    // txtQrCodeString.textAlignment = .center
    // txtQrCodeString.sizeToFit();
    // v5.addSubview(txtQrCodeString);
       
      
    // txtMessage = UILabel();
    // txtMessage.text = "Scan the above QR Code using your HEXA wallet in order to restore your Secure Account.";
    // txtMessage.lineBreakMode = .byWordWrapping
    // txtMessage.numberOfLines = 0
    // txtMessage.frame = CGRect(x:5,y: ( txtQrCodeString.frame.origin.y + txtQrCodeString.frame.height),width:v1.bounds.size.width - 10, height:v1.bounds.size.height)
    // txtMessage.font =  UIFont.systemFont(ofSize: 6.0)
    // txtMessage.textAlignment = .center
    // txtMessage.sizeToFit();
    // v5.addSubview(txtMessage);
      
      
    
    txtTitle = UILabel();
    txtTitle.text = "Exit/Regenerate 2FA Key:"
    txtTitle.lineBreakMode = .byWordWrapping
    txtTitle.numberOfLines = 0
    txtTitle.frame = CGRect(x:5,y:(txtMessage.frame.origin.y + txtMessage.frame.height),width:v5.bounds.size.width - 5, height:v5.bounds.size.height)
    txtTitle.font =  UIFont.systemFont(ofSize: 10.0)
    txtTitle.textColor = UIColor.black
    txtTitle.textAlignment = .left
    txtTitle.sizeToFit()
    v5.addSubview(txtTitle)

    txtPart.text = "Use this key to reset the 2FA if you have lost your authenticator app or for transferring your funds from Savings account if the BitHyve server is not responding"
    txtPart.lineBreakMode = .byWordWrapping
    txtPart.numberOfLines = 0
    txtPart.frame = CGRect(x:10,y:txtTitle.frame.height + txtTitle.font.ascender + 2,width:v5.bounds.size.width - 10, height:v5.bounds.size.height)
    txtPart.font = UIFont.systemFont(ofSize: 6.0)
    txtPart.textColor = UIColor.black
    txtPart.textAlignment = .left
    txtPart.sizeToFit()
    v5.addSubview(txtPart)

    qrCodeImage = UIImageView();
    generator = QRCodeGenerator();
    qrCodeImage.image = generator.createImage(value: secondaryMnemonic as String,size: CGSize(width: imageSize, height: imageSize - 10))
    qrCodeImage.frame = CGRect(x: 10, y: ( txtTitle.frame.origin.y + txtTitle.frame.height + txtPart.frame.height + 15) , width: imageSize, height: imageSize)
     v5.addSubview(qrCodeImage)
    
    // txtQrCodeString = UILabel();
    // txtQrCodeString.text = secondaryMnemonic as? String;
    // txtQrCodeString.lineBreakMode = .byWordWrapping
    // txtQrCodeString.numberOfLines = 0
    // txtQrCodeString.frame = CGRect(x:10,y: ( qrCodeImage.frame.origin.y + qrCodeImage.frame.height),width:v5.bounds.size.width - 20, height:v5.bounds.size.height)
    // txtQrCodeString.font =  UIFont.systemFont(ofSize: 6.0)
    // txtQrCodeString.textColor = UIColor.black
    // txtQrCodeString.textAlignment = .center
    // txtQrCodeString.sizeToFit();
    // v5.addSubview(txtQrCodeString);
         
//    txtTitle = UILabel();
//    txtTitle.text = "BitHyve Xpub:"
//    txtTitle.lineBreakMode = .byWordWrapping
//    txtTitle.numberOfLines = 0
//    txtTitle.frame = CGRect(x:5,y:(txtQrCodeString.frame.origin.y + txtQrCodeString.frame.height),width:v1.bounds.size.width - 5, height:v1.bounds.size.height)
//    txtTitle.font =  UIFont.systemFont(ofSize: 10.0)
//    txtTitle.textColor = UIColor.black
//    txtTitle.textAlignment = .left
//    txtTitle.sizeToFit()
//    v5.addSubview(txtTitle)
//    txtQrCodeString = UILabel();
//    txtQrCodeString.text = bhXpub as? String;
//    txtQrCodeString.lineBreakMode = .byWordWrapping
//    txtQrCodeString.numberOfLines = 0
//    txtQrCodeString.frame = CGRect(x:10,y: ( txtTitle.frame.origin.y + txtTitle.frame.height),width:v5.bounds.size.width - 20, height:v5.bounds.size.height)
//    txtQrCodeString.font =  UIFont.systemFont(ofSize: 5.5)
//    txtQrCodeString.textColor = UIColor.black
//    txtQrCodeString.textAlignment = .center
//    txtQrCodeString.sizeToFit();
//    v5.addSubview(txtQrCodeString);
       
     
    // txtMessage = UILabel();
    // txtMessage.text = "Following assets can be used to recover your funds using the open - sourced ga - recovery tool.";
    // txtMessage.lineBreakMode = .byWordWrapping
    // txtMessage.numberOfLines = 0
    // txtMessage.frame = CGRect(x:5,y: ( txtQrCodeString.frame.origin.y + txtQrCodeString.frame.height),width:v5.bounds.size.width - 10, height:v5.bounds.size.height)
    // txtMessage.font =  UIFont.systemFont(ofSize: 6.0)
    // txtMessage.textColor = UIColor.black
    // txtMessage.textAlignment = .left
    // txtMessage.sizeToFit();
    // v5.addSubview(txtMessage);
       
    let page1 = PDFPage.view(v1);
    let page2 = PDFPage.view(v2);
    let page3 = PDFPage.view(v3);
    let page4 = PDFPage.view(v4);
    let page5 = PDFPage.view(v5);
   
      
    let pages = [page1, page2,page3,page4,page5]
    let dst = NSTemporaryDirectory().appending(pdfPath as String)
    do {
      //  try PDFGenerator.generate(pages, to: dst, password: password )
      // or use PDFPassword model
      try PDFGenerator.generate(pages, to: dst, password: PDFPassword(password as String))
      // or use PDFPassword model and set user/owner password
      try PDFGenerator.generate(pages, to: dst, password: PDFPassword(user: password as String, owner: password as String))
      //print("file generate",dst)
    } catch let error {
      print(error)
    }
    return  dst;
  }
}



extension String {
  
  /// Generates a `UIImage` instance from this string using a specified
  /// attributes and size.
  ///
  /// - Parameters:
  ///     - attributes: to draw this string with. Default is `nil`.
  ///     - size: of the image to return.
  /// - Returns: a `UIImage` instance from this string using a specified
  /// attributes and size, or `nil` if the operation fails.
  func image(withAttributes attributes: [NSAttributedString.Key: Any]? = nil, size: CGSize? = nil) -> UIImage? {
    let size = size ?? (self as NSString).size(withAttributes: attributes)
    UIGraphicsBeginImageContext(size)
    (self as NSString).draw(in: CGRect(origin: .zero, size: size),
                            withAttributes: attributes)
    let image = UIGraphicsGetImageFromCurrentImageContext()
    UIGraphicsEndImageContext()
    return image
  }
  
}
